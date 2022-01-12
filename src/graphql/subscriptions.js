/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRewards = /* GraphQL */ `
  subscription OnCreateRewards {
    onCreateRewards {
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
export const onUpdateRewards = /* GraphQL */ `
  subscription OnUpdateRewards {
    onUpdateRewards {
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
export const onDeleteRewards = /* GraphQL */ `
  subscription OnDeleteRewards {
    onDeleteRewards {
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
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback {
    onCreateFeedback {
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
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback {
    onUpdateFeedback {
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
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback {
    onDeleteFeedback {
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
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal {
    onCreateGoal {
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
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal {
    onUpdateGoal {
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
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal {
    onDeleteGoal {
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
export const onCreateFeedbackFromGoals = /* GraphQL */ `
  subscription OnCreateFeedbackFromGoals {
    onCreateFeedbackFromGoals {
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
export const onUpdateFeedbackFromGoals = /* GraphQL */ `
  subscription OnUpdateFeedbackFromGoals {
    onUpdateFeedbackFromGoals {
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
export const onDeleteFeedbackFromGoals = /* GraphQL */ `
  subscription OnDeleteFeedbackFromGoals {
    onDeleteFeedbackFromGoals {
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
export const onCreateRequests = /* GraphQL */ `
  subscription OnCreateRequests {
    onCreateRequests {
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
export const onUpdateRequests = /* GraphQL */ `
  subscription OnUpdateRequests {
    onUpdateRequests {
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
export const onDeleteRequests = /* GraphQL */ `
  subscription OnDeleteRequests {
    onDeleteRequests {
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
export const onCreateRatings = /* GraphQL */ `
  subscription OnCreateRatings {
    onCreateRatings {
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
export const onUpdateRatings = /* GraphQL */ `
  subscription OnUpdateRatings {
    onUpdateRatings {
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
export const onDeleteRatings = /* GraphQL */ `
  subscription OnDeleteRatings {
    onDeleteRatings {
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
