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
        Salary
        Address
        Department
        Rewards {
            items {
                RewardID
                RewardPoints
            }
            nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
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