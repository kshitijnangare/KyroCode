import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import Badge from '../Badge.js';
import CoinsLedger from '../CoinsLedger.js';
import Contest from '../Contest.js';
import ContestContributor from '../ContestContributor.js';
import ContestProblem from '../ContestProblem.js';
import DailyProblem from '../DailyProblem.js';
import Education from '../Education.js';
import Institute from '../Institute.js';
import Order from '../Order.js';
import Problem from '../Problem.js';
import ProblemCompanyTag from '../ProblemCompanyTag.js';
import ProblemTopicTag from '../ProblemTopicTag.js';
import RatingHistory from '../RatingHistory.js';
import Sheet from '../Sheet.js';
import Submission from '../Submission.js';
import TestCase from '../TestCase.js';
import User from '../User.js';
import UserBadge from '../UserBadge.js';
import UserFollows from '../UserFollows.js';
import UserSolvedProblem from '../UserSolvedProblem.js';
import WorkExperience from '../WorkExperience.js';
import ContestParticipant from '../ContestParticipant.js';

const models = {
    Badge,
    CoinsLedger,
    Contest,
    ContestContributor,
    ContestProblem,
    DailyProblem,
    Education,
    Institute,
    Order,
    Problem,
    ProblemCompanyTag,
    ProblemTopicTag,
    RatingHistory,
    Sheet,
    Submission,
    TestCase,
    User,
    UserBadge,
    UserFollows,
    UserSolvedProblem,
    WorkExperience,
};


/* ═══════════════════════════════════════════════
    ■ USER associations
═══════════════════════════════════════════════ */

/* ----- 1 : M Associations ----- */

User.hasMany(UserBadge, { foreignKey: 'user_id', as: 'myBadges', onDelete: 'CASCADE', });
UserBadge.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', });

User.hasMany(WorkExperience, { foreignKey: 'user_id', as: 'myWorkExperiences', onDelete: 'CASCADE', });
WorkExperience.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', });

User.hasMany(Education, { foreignKey: 'user_id', as: 'myEducations', onDelete: 'CASCADE', });
Education.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', });

User.hasMany(Sheet, { foreignKey: 'user_id', as: 'myCreatedSheets', onDelete: 'CASCADE', });
Sheet.belongsTo(User, { foreignKey: 'user_id', as: 'createdBy', onDelete: 'CASCADE', });

User.hasMany(Order, { foreignKey: 'user_id', as: 'myOrders', });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'orderedBy', });

User.hasMany(CoinsLedger, { foreignKey: 'user_id', as: 'myCoinsLedger', onDelete: 'CASCADE', });
CoinsLedger.belongsTo(User, { foreignKey: 'user_id', as: 'accountHolder', onDelete: 'CASCADE', });

User.hasMany(Submission, { foreignKey: 'user_id', as: 'mySubmissions', onDelete: 'CASCADE', });
Submission.belongsTo(User, { foreignKey: 'user_id', as: 'submittedBy', onDelete: 'CASCADE', });

User.hasMany(RatingHistory, { foreignKey: 'user_id', as: 'myRatingHistory', onDelete: 'CASCADE', });
RatingHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', });

User.hasMany(ContestParticipant, {foreignKey: 'user_id', as: 'myParticipatedContests', onDelete: 'CASCADE', });
ContestParticipant.belongsTo(User, { foreignKey: 'user_id', as: 'participant', onDelete: 'CASCADE', });

User.hasMany(ContestContributor, { foreignKey: 'user_id', as: 'myCreatedContests', });
ContestContributor.belongsTo(User, { foreignKey: 'user_id', as: 'contributor', });

User.hasMany(UserSolvedProblem, { foreignKey: 'user_id', as: 'mySolvedProblems', onDelete: 'CASCADE', });
UserSolvedProblem.belongsTo(User, { foreignKey: 'user_id', as: 'solvedBy', onDelete: 'CASCADE', });

// now sometimes user behaves as a follower hence declare that relation
// lets take example where user is Kshitij

// 1. Kshitij follows people (He is the follower. Kshitij follows some people on kyrocode. Kshitij is a follower for his connection to whom he follow.)
// Gets all connection rows where Kshitij is the follower
User.hasMany(UserFollows, {foreignKey: 'follower_id', as: 'followingConnections', onDelete: 'CASCADE', });
// now all those followingConnections have Kshitij as follower --> followerUser
// From a connection row, get the target person Kshitij is following
UserFollows.belongsTo(User, {foreignKey: 'following_id', as: 'followerUser',  onDelete: 'CASCADE', });

// 2. People follow Kshitij (Kshitij is the one being followed. he has some followers too who follow him)
// Gets all connection rows where Kshitij is being followed
User.hasMany(UserFollows, { foreignKey: 'following_id', as: 'followerConnections', onDelete: 'CASCADE', });
// now all those followers have Kshitij as following in thier list --> followedUser
// From a connection row, get the person who followed Kshitij
UserFollows.belongsTo(User, { foreignKey: 'follower_id', as: 'followedUser', onDelete: 'CASCADE', });



/* ----- M : N Associations ----- */

User.belongsToMany(Badge, { through: UserBadge, foreignKey: 'user_id', otherKey: 'badge_id', as: 'badgesEarned', });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: 'badge_id', otherKey: 'user_id', as: 'badgeHolders', });

User.belongsToMany(Contest, { through: ContestParticipant, foreignKey: 'user_id', otherKey: 'contest_id', as: 'participatedContests', });
Contest.belongsToMany(User, { through: ContestParticipant, foreignKey: 'contest_id', otherKey: 'user_id', as: 'participants', });

User.belongsToMany(Contest, { through: ContestContributor, foreignKey: 'user_id', otherKey: 'contest_id', as: 'contributedContests', });
Contest.belongsToMany(User, { through: ContestContributor, foreignKey: 'contest_id', otherKey: 'user_id', as: 'contributors', });

User.belongsToMany(Problem, { through: UserSolvedProblem, foreignKey: 'user_id', otherKey: 'problem_id', as: 'solvedProblems' });
Problem.belongsToMany(User, { through: UserSolvedProblem, foreignKey: 'problem_id', otherKey: 'user_id', as: 'solvedByUsers' });

User.belongsToMany(User, { through: UserFollows, foreignKey: 'follower_id', otherKey: 'following_id', as: 'following' });
User.belongsToMany(User, { through: UserFollows, foreignKey: 'following_id', otherKey: 'follower_id', as: 'followers' });