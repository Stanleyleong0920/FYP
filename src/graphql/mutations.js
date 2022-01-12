/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const signUp = /* GraphQL */ `
  mutation SignUp(
    $username: String
    $password: String
    $address: String
    $fullName: String
    $department: String
    $identity: String
    $salary: Int
  ) {
    signUp(
      username: $username
      password: $password
      address: $address
      fullName: $fullName
      department: $department
      identity: $identity
      salary: $salary
    ) {
      statusCode
      body
    }
  }
`;
export const resetPassword = /* GraphQL */ `
  mutation ResetPassword(
    $username: String
    $code: String
    $password: String
    $isSendCode: Boolean
  ) {
    resetPassword(
      username: $username
      code: $code
      password: $password
      isSendCode: $isSendCode
    ) {
      statusCode
      body
    }
  }
`;
export const signIn = /* GraphQL */ `
  mutation SignIn($email: String) {
    signIn(email: $email) {
      statusCode
      body
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers($id: String) {
    deleteUsers(id: $id) {
      statusCode
      body
    }
  }
`;
export const editUsers = /* GraphQL */ `
  mutation EditUsers(
    $id: String
    $address: String
    $identity: String
    $department: String
    $salary: Int
  ) {
    editUsers(
      id: $id
      address: $address
      identity: $identity
      department: $department
      salary: $salary
    ) {
      statusCode
      body
    }
  }
`;
export const addFeedback = /* GraphQL */ `
  mutation AddFeedback(
    $senderId: ID!
    $senderName: String
    $senderDep: String
    $feedback: String
    $receiverId: ID!
    $receiverName: String
    $receiverDep: String
  ) {
    addFeedback(
      senderId: $senderId
      senderName: $senderName
      senderDep: $senderDep
      feedback: $feedback
      receiverId: $receiverId
      receiverName: $receiverName
      receiverDep: $receiverDep
    ) {
      statusCode
      body
    }
  }
`;
export const editFeedback = /* GraphQL */ `
  mutation EditFeedback($feedbackId: ID!, $feedback: String) {
    editFeedback(feedbackId: $feedbackId, feedback: $feedback) {
      statusCode
      body
    }
  }
`;
export const dltFeedback = /* GraphQL */ `
  mutation DltFeedback($feedbackId: ID!) {
    dltFeedback(feedbackId: $feedbackId) {
      statusCode
      body
    }
  }
`;
export const addGoal = /* GraphQL */ `
  mutation AddGoal(
    $managerId: ID!
    $managerName: String
    $employeeID: ID!
    $employeeName: String
    $department: String
    $goalDescription: String!
    $status: String!
    $dueDate: String!
  ) {
    addGoal(
      managerId: $managerId
      managerName: $managerName
      employeeID: $employeeID
      employeeName: $employeeName
      department: $department
      goalDescription: $goalDescription
      status: $status
      dueDate: $dueDate
    ) {
      statusCode
      body
    }
  }
`;
export const editGoal = /* GraphQL */ `
  mutation EditGoal($goalId: ID!, $description: String, $dueDate: String!) {
    editGoal(goalId: $goalId, description: $description, dueDate: $dueDate) {
      statusCode
      body
    }
  }
`;
export const dltGoal = /* GraphQL */ `
  mutation DltGoal($goalId: ID!) {
    dltGoal(goalId: $goalId) {
      statusCode
      body
    }
  }
`;
export const addFeedbackToGoal = /* GraphQL */ `
  mutation AddFeedbackToGoal($goalId: ID!, $feedback: String) {
    addFeedbackToGoal(goalId: $goalId, feedback: $feedback) {
      statusCode
      body
    }
  }
`;
export const checkDeadLine = /* GraphQL */ `
  mutation CheckDeadLine($goalId: [String]) {
    checkDeadLine(goalId: $goalId) {
      statusCode
      body
    }
  }
`;
export const handleAcknowledged = /* GraphQL */ `
  mutation HandleAcknowledged($goalId: String) {
    handleAcknowledged(goalId: $goalId) {
      statusCode
      body
    }
  }
`;
export const employeehandleAcknowledged = /* GraphQL */ `
  mutation EmployeehandleAcknowledged($goalId: String) {
    employeehandleAcknowledged(goalId: $goalId) {
      statusCode
      body
    }
  }
`;
export const employeehandleSubmit = /* GraphQL */ `
  mutation EmployeehandleSubmit(
    $goalId: String
    $comments: String
    $status: String
  ) {
    employeehandleSubmit(
      goalId: $goalId
      comments: $comments
      status: $status
    ) {
      statusCode
      body
    }
  }
`;
export const requestSubmit = /* GraphQL */ `
  mutation RequestSubmit(
    $requesterId: ID!
    $requesterName: String
    $requesterIdentity: String
    $requesterDepartment: String
    $salary: Int
    $rewardPoints: Int
    $days: Int
    $type: String
    $status: String
    $startDate: String
    $endDate: String
  ) {
    requestSubmit(
      requesterId: $requesterId
      requesterName: $requesterName
      requesterIdentity: $requesterIdentity
      requesterDepartment: $requesterDepartment
      salary: $salary
      rewardPoints: $rewardPoints
      days: $days
      type: $type
      status: $status
      startDate: $startDate
      endDate: $endDate
    ) {
      statusCode
      body
    }
  }
`;
export const dltRequest = /* GraphQL */ `
  mutation DltRequest($requestId: ID!) {
    dltRequest(requestId: $requestId) {
      statusCode
      body
    }
  }
`;
export const handleApproval = /* GraphQL */ `
  mutation HandleApproval(
    $requestId: ID!
    $approverId: ID!
    $approverName: String
    $approvedReason: String
    $approverIdentity: String
    $approvalStatus: String
  ) {
    handleApproval(
      requestId: $requestId
      approverId: $approverId
      approverName: $approverName
      approvedReason: $approvedReason
      approverIdentity: $approverIdentity
      approvalStatus: $approvalStatus
    ) {
      statusCode
      body
    }
  }
`;
export const handleSubmitGoalRating = /* GraphQL */ `
  mutation HandleSubmitGoalRating(
    $goalId: ID!
    $punctuality: Float
    $responsibility: Float
    $activeness: Float
    $hardworking: Float
    $personality: Float
    $feedback: String
    $type: String
    $status: String
    $dueDate: String
  ) {
    handleSubmitGoalRating(
      goalId: $goalId
      punctuality: $punctuality
      responsibility: $responsibility
      activeness: $activeness
      hardworking: $hardworking
      personality: $personality
      feedback: $feedback
      type: $type
      status: $status
      dueDate: $dueDate
    ) {
      statusCode
      body
    }
  }
`;
export const submitRating = /* GraphQL */ `
  mutation SubmitRating(
    $raterId: ID
    $raterName: String
    $raterIdentity: String
    $raterDepartment: String
    $punctuality: Float
    $responsibility: Float
    $activeness: Float
    $hardworking: Float
    $personality: Float
    $feedback: String
    $type: String
    $dueDate: String
    $receiverId: ID
    $receiverName: String
    $receiverIdentity: String
    $receiverDepartment: String
  ) {
    submitRating(
      raterId: $raterId
      raterName: $raterName
      raterIdentity: $raterIdentity
      raterDepartment: $raterDepartment
      punctuality: $punctuality
      responsibility: $responsibility
      activeness: $activeness
      hardworking: $hardworking
      personality: $personality
      feedback: $feedback
      type: $type
      dueDate: $dueDate
      receiverId: $receiverId
      receiverName: $receiverName
      receiverIdentity: $receiverIdentity
      receiverDepartment: $receiverDepartment
    ) {
      statusCode
      body
    }
  }
`;
export const downloadPerformanceRecords = /* GraphQL */ `
  mutation DownloadPerformanceRecords($id: ID!) {
    downloadPerformanceRecords(id: $id) {
      statusCode
      body
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRewards = /* GraphQL */ `
  mutation CreateRewards(
    $input: CreateRewardsInput!
    $condition: ModelRewardsConditionInput
  ) {
    createRewards(input: $input, condition: $condition) {
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
export const updateRewards = /* GraphQL */ `
  mutation UpdateRewards(
    $input: UpdateRewardsInput!
    $condition: ModelRewardsConditionInput
  ) {
    updateRewards(input: $input, condition: $condition) {
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
export const deleteRewards = /* GraphQL */ `
  mutation DeleteRewards(
    $input: DeleteRewardsInput!
    $condition: ModelRewardsConditionInput
  ) {
    deleteRewards(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
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
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
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
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
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
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
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
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
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
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
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
export const createFeedbackFromGoals = /* GraphQL */ `
  mutation CreateFeedbackFromGoals(
    $input: CreateFeedbackFromGoalsInput!
    $condition: ModelFeedbackFromGoalsConditionInput
  ) {
    createFeedbackFromGoals(input: $input, condition: $condition) {
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
export const updateFeedbackFromGoals = /* GraphQL */ `
  mutation UpdateFeedbackFromGoals(
    $input: UpdateFeedbackFromGoalsInput!
    $condition: ModelFeedbackFromGoalsConditionInput
  ) {
    updateFeedbackFromGoals(input: $input, condition: $condition) {
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
export const deleteFeedbackFromGoals = /* GraphQL */ `
  mutation DeleteFeedbackFromGoals(
    $input: DeleteFeedbackFromGoalsInput!
    $condition: ModelFeedbackFromGoalsConditionInput
  ) {
    deleteFeedbackFromGoals(input: $input, condition: $condition) {
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
export const createRequests = /* GraphQL */ `
  mutation CreateRequests(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequests(input: $input, condition: $condition) {
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
export const updateRequests = /* GraphQL */ `
  mutation UpdateRequests(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequests(input: $input, condition: $condition) {
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
export const deleteRequests = /* GraphQL */ `
  mutation DeleteRequests(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequests(input: $input, condition: $condition) {
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
export const createRatings = /* GraphQL */ `
  mutation CreateRatings(
    $input: CreateRatingsInput!
    $condition: ModelRatingsConditionInput
  ) {
    createRatings(input: $input, condition: $condition) {
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
export const updateRatings = /* GraphQL */ `
  mutation UpdateRatings(
    $input: UpdateRatingsInput!
    $condition: ModelRatingsConditionInput
  ) {
    updateRatings(input: $input, condition: $condition) {
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
export const deleteRatings = /* GraphQL */ `
  mutation DeleteRatings(
    $input: DeleteRatingsInput!
    $condition: ModelRatingsConditionInput
  ) {
    deleteRatings(input: $input, condition: $condition) {
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
