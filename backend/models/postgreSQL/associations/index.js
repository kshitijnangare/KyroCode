import { sequelize } from '../../../config/postgreSQL.js';
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
import SheetProblem from '../SheetProblem.js';
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
    SheetProblem,
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

/* ═══════════════════════════════════════════════
    ■ CONTESTS associations
═══════════════════════════════════════════════ */

Contest.hasMany(ContestContributor, { foreignKey: 'contest_id', as: 'contributors', });
ContestContributor.belongsTo(Contest, { foreignKey: 'contest_id', as: 'contest', });

Contest.hasMany(ContestParticipant, { foreignKey: 'contest_id', as: 'participants', });
ContestParticipant.belongsTo(Contest, { foreignKey: 'contest_id', as: 'contest', });

Contest.hasMany(ContestProblem, { foreignKey: 'contest_id', as: 'contestProblems', });
ContestProblem.belongsTo(Contest, { foreignKey: 'contest_id', as: 'contest', });

Contest.hasMany(RatingHistory, { foreignKey: 'contest_id', as: 'ratingHistory', });
RatingHistory.belongsTo(Contest, { foreignKey: 'contest_id', as: 'contest', });

Contest.hasMany(Submission, { foreignKey: 'contest_id', as: 'submissions', });
Submission.belongsTo(Contest, { foreignKey: 'contest_id', as: 'contest', });

Contest.belongsToMany(Problem, {through: ContestProblem, foreignKey: 'contest_id', otherKey: 'problem_id', as: 'problems', });
Problem.belongsToMany(Contest, { through: ContestProblem, foreignKey: 'problem_id', otherKey: 'contest_id', as: 'contests', });

/* ═══════════════════════════════════════════════
    ■ PROBLEMS associations
═══════════════════════════════════════════════ */

/* ----- 1 : M Associations ----- */

Problem.hasMany(ContestProblem, { foreignKey: 'problem_id', as: 'contests', });
ContestProblem.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', });

Problem.hasMany(Submission, { foreignKey: 'problem_id', as: 'submissions', onDelete: 'CASCADE', });
Submission.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', onDelete: 'CASCADE', });

Problem.hasMany(TestCase, { foreignKey: 'problem_id', as: 'testCases', onDelete: 'CASCADE', });
TestCase.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', onDelete: 'CASCADE', });

Problem.hasMany(SheetProblem, { foreignKey: 'problem_id', as: 'sheets', });
SheetProblem.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', });

Problem.hasMany(ProblemCompanyTag, { foreignKey: 'problem_id', as: 'companyTags', });
ProblemCompanyTag.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', });

Problem.hasMany(ProblemTopicTag, { foreignKey: 'problem_id', as: 'topicTags', });
ProblemTopicTag.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', });

Problem.hasMany(UserSolvedProblem, { foreignKey: 'problem_id', as: 'solvedByUsers', onDelete: 'CASCADE', });
UserSolvedProblem.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', onDelete: 'CASCADE', });

Problem.hasMany(DailyProblem, { foreignKey: 'problem_id', as: 'dailyProblems', });
DailyProblem.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem', });

/* ----- M : N Associations ----- */

Problem.belongsToMany(Sheet, { through: SheetProblem, foreignKey: 'problem_id', otherKey: 'sheet_id', as: 'sheets', });
Sheet.belongsToMany(Problem, {through: SheetProblem, foreignKey: 'sheet_id', otherKey: 'problem_id', as: 'problems', });

/* ═══════════════════════════════════════════════
    ■ SUBMISSIONS associations
═══════════════════════════════════════════════ */

Submission.hasMany(CoinsLedger, { foreignKey: 'reference_id', as: 'coins', onDelete: 'CASCADE', });
CoinsLedger.belongsTo(Submission, { foreignKey: 'reference_id', as: 'submission', onDelete: 'CASCADE', });

/* ═══════════════════════════════════════════════
    ■ EDUCATION & INSTITUTE associations
═══════════════════════════════════════════════ */

Institute.hasMany(Education, { foreignKey: 'institute_id', as: 'educations' });
Education.belongsTo(Institute, { foreignKey: 'institute_id', as: 'institute' });

/* ═══════════════════════════════════════════════
    ■ SHEETS associations
═══════════════════════════════════════════════ */

Sheet.hasMany(SheetProblem, { foreignKey: 'sheet_id', as: 'sheetProblems', onDelete: 'CASCADE' });
SheetProblem.belongsTo(Sheet, { foreignKey: 'sheet_id', as: 'sheet', onDelete: 'CASCADE' });

/* ═══════════════════════════════════════════════
    ■ BADGES associations
═══════════════════════════════════════════════ */

Badge.hasMany(UserBadge, { foreignKey: 'badge_id', as: 'userBadges', onDelete: 'CASCADE' });
UserBadge.belongsTo(Badge, { foreignKey: 'badge_id', as: 'badge', onDelete: 'CASCADE' });