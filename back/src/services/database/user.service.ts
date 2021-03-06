import { User, CreateUserInput, UpdateUserInput, UserCredentialsInput } from "../../services/graphql/generated/API"
import { getDBConnection } from "./databaseConfig"
import { ObjectId } from "mongodb"
import { UserValidator } from "../../services/validators/userValidator"
import { GraphqlBadRequest, GraphqlDBUnknownError, GraphQLNotFound } from "../../services/validators/customErrors"

async function getUser(userId: string): Promise<User> {
  const db = await getDBConnection()

  UserValidator.validateUserId(userId)

  const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) })

  if (!userData) throw new GraphqlBadRequest('The user with the given id does not exist')

  return userData
}

async function getListOfUsers(): Promise<User[]> {
  const db = await getDBConnection()
  return await db.collection('users').find().toArray()
}

async function loginUser(userCredentialsInput: UserCredentialsInput): Promise<User> {
  const db = await getDBConnection()
  const { email, password } = userCredentialsInput

  const userData = await db.collection('users').findOne({ email, password })

  if (!userData) throw new GraphQLNotFound('Usuario o contraseña incorrectos')

  console.log(userData)
  return userData
}

async function createUser(createUserInput: CreateUserInput): Promise<User> {
  const db = await getDBConnection()
  UserValidator.validateUserOnCreate(createUserInput)

  const result = await db.collection('users').insertOne(createUserInput)
  return { _id: result.insertedId, ...createUserInput }
}

async function updateUser(updateUserInput: UpdateUserInput): Promise<User> {
  const db = await getDBConnection()
  const { _id, ...userInput } = updateUserInput
  UserValidator.validateUserOnUpdate(updateUserInput)

  const result = await db.collection('users').findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: userInput }, { returnOriginal: false })

  if (!result.ok) throw new GraphqlDBUnknownError()

  return result.value
}

async function deleteUser(userId: string): Promise<User> {
  const db = await getDBConnection()

  const result = await db.collection('users').findOneAndDelete({ _id: new ObjectId(userId) })

  if (!result.ok) throw new GraphqlDBUnknownError()
  if (!result.value) throw new GraphQLNotFound('Could not find a user with the given id')

  const { _id, ...rest } = result.value
  return { _id: _id.toHexString(), ...rest }
}

export const UserService = { getUser, getListOfUsers, loginUser, createUser, updateUser, deleteUser }
