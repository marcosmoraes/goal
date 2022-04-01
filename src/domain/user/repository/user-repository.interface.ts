import RepositoryInterface from "domain/@shared/domain/repository/repository-interface";
import User from "../entities/user";

export default interface UserRepositoryInterface extends RepositoryInterface<User>{}