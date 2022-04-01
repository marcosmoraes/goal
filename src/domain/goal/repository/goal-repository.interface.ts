import RepositoryInterface from "domain/@shared/domain/repository/repository-interface";
import { Goal } from "../entities/goal";

export default interface GoalRepositoryInterface extends RepositoryInterface<Goal>{}