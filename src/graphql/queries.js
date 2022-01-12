/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const test = /* GraphQL */ `
  query Test($id: Boolean, $name: String) {
    test(id: $id, name: $name) {
      statusCode
      body
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($EmployeeID: ID!) {
    getUser(EmployeeID: $EmployeeID) {
      EmployeeID
      Name
      Email
      Identity
      Address
      Department
      Salary
      Rewards {
        items {
          RewardID
          RewardPoints
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $EmployeeID: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      EmployeeID: $EmployeeID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        EmployeeID
        Name
        Email
        Identity
        Address
        Department
        Salary
        Rewards {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRewards = /* GraphQL */ `
  query GetRewards($RewardID: ID!) {
    getRewards(RewardID: $RewardID) {
      RewardID
      RewardPoints
      User {
        EmployeeID
        Name
        Email
        Identity
        Address
        Department
        Salary
        Rewards {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRewardss = /* GraphQL */ `
  query ListRewardss(
    $RewardID: ID
    $filter: ModelRewardsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRewardss(
      RewardID: $RewardID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        RewardID
        RewardPoints
        User {
          EmployeeID
          Name
          Email
          Identity
          Address
          Department
          Salary
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($FeedbackID: ID!) {
    getFeedback(FeedbackID: $FeedbackID) {
      FeedbackID
      SenderID
      SenderName
      SenderDep
      Description
      ReceiverID
      ReceiverName
      ReceiverDep
      createdAt
      updatedAt
    }
  }
`;
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $FeedbackID: ID
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFeedbacks(
      FeedbackID: $FeedbackID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        FeedbackID
        SenderID
        SenderName
        SenderDep
        Description
        ReceiverID
        ReceiverName
        ReceiverDep
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($GoalID: ID!) {
    getGoal(GoalID: $GoalID) {
      GoalID
      ManagerID
      ManagerName
      GoalDescription
      DueDate
      Department
      EmployeeID
      EmployeeName
      AcknowledgeByEmployee
      Status
      Feedback {
        items {
          GoalFeedbackID
          Sender
          Feedback
          createdAt
          updatedAt
        }
        nextToken
      }
      EmployeeStatus
      EmployeeComments
      createdAt
      updatedAt
    }
  }
`;
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $GoalID: ID
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGoals(
      GoalID: $GoalID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        GoalID
        ManagerID
        ManagerName
        GoalDescription
        DueDate
        Department
        EmployeeID
        EmployeeName
        AcknowledgeByEmployee
        Status
        Feedback {
          nextToken
        }
        EmployeeStatus
        EmployeeComments
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeedbackFromGoals = /* GraphQL */ `
  query GetFeedbackFromGoals($GoalFeedbackID: ID!) {
    getFeedbackFromGoals(GoalFeedbackID: $GoalFeedbackID) {
      GoalFeedbackID
      Sender
      Feedback
      Goal {
        GoalID
        ManagerID
        ManagerName
        GoalDescription
        DueDate
        Department
        EmployeeID
        EmployeeName
        AcknowledgeByEmployee
        Status
        Feedback {
          nextToken
        }
        EmployeeStatus
        EmployeeComments
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFeedbackFromGoalss = /* GraphQL */ `
  query ListFeedbackFromGoalss(
    $GoalFeedbackID: ID
    $filter: ModelFeedbackFromGoalsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFeedbackFromGoalss(
      GoalFeedbackID: $GoalFeedbackID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        GoalFeedbackID
        Sender
        Feedback
        Goal {
          GoalID
          ManagerID
          ManagerName
          GoalDescription
          DueDate
          Department
          EmployeeID
          EmployeeName
          AcknowledgeByEmployee
          Status
          EmployeeStatus
          EmployeeComments
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRequests = /* GraphQL */ `
  query GetRequests($RequestID: ID!) {
    getRequests(RequestID: $RequestID) {
      RequestID
      RequesterID
      RequesterName
      RequesterDepartment
      RequesterIdentity
      RequestType
      Description
      RewardPointsNeeded
      Status
      ApprovedByManager
      ManagerID
      ManagerName
      ApprovedByAdmin
      AdminID
      AdminName
      ManagerReason
      AdminReason
      createdAt
      updatedAt
    }
  }
`;
export const listRequestss = /* GraphQL */ `
  query ListRequestss(
    $RequestID: ID
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRequestss(
      RequestID: $RequestID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        RequestID
        RequesterID
        RequesterName
        RequesterDepartment
        RequesterIdentity
        RequestType
        Description
        RewardPointsNeeded
        Status
        ApprovedByManager
        ManagerID
        ManagerName
        ApprovedByAdmin
        AdminID
        AdminName
        ManagerReason
        AdminReason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRatings = /* GraphQL */ `
  query GetRatings($RatingID: ID!) {
    getRatings(RatingID: $RatingID) {
      RatingID
      RaterID
      RaterName
      RaterIdentity
      RaterDepartment
      Responsibility
      Punctuality
      Activeness
      Hardworking
      Personality
      Feedback
      ReceiverID
      ReceiverName
      ReceiverIdentity
      ReceiverDepartment
      DueDate
      Type
      createdAt
      updatedAt
    }
  }
`;
export const listRatingss = /* GraphQL */ `
  query ListRatingss(
    $RatingID: ID
    $filter: ModelRatingsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRatingss(
      RatingID: $RatingID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        RatingID
        RaterID
        RaterName
        RaterIdentity
        RaterDepartment
        Responsibility
        Punctuality
        Activeness
        Hardworking
        Personality
        Feedback
        ReceiverID
        ReceiverName
        ReceiverIdentity
        ReceiverDepartment
        DueDate
        Type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
