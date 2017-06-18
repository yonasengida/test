define({ "api": [
  {
    "description": "<p>This endpoint is allow to Add Job Category</p>",
    "type": "post",
    "url": "/customers/category",
    "title": "Add Jobcategory",
    "name": "AddJobCategory",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>Customer Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_category",
            "description": "<p>Job Category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n\n\t\"job_category\":\"5919d43e0971ba43eeeaced3\",\n\t\"customerId\":\"5919d82e0971ba43eeeaced9\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n      \"_id\": \"5919d82e0971ba43eeeaced9\",\n      \"job_category\": [\n          \"5919d43e0971ba43eeeaced3\"\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "description": "<p>This Endpoint is allow to get specific customer</p>",
    "type": "get",
    "url": "/customers/:id",
    "title": "Get Specfic customer",
    "name": "GetCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\n       \"_id\": \"58af8cbd7544b94c8fa864e7\",\n       \"first_name\": \"Chelsea\",\n       \"last_name\": \" The Blues\",\n       \"user_name\": \"StandfordBridge\",\n       \"email\": \"Daniel\",\n       \"date_of_birth\": \"1970-01-01T00:00:01.916Z\",\n       \"follower\": [],\n       \"country\": \"England\",\n       \"city\": \"london\",\n       \"bio\": \"this is test bio abou anyone\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "description": "<p>This endpoint is allow to Get all customers</p>",
    "type": "get",
    "url": "/customers",
    "title": "Get all Customer",
    "name": "GetCustomers",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\n       \"_id\": \"58af8cbd7544b94c8fa864e7\",\n       \"first_name\": \"Chelsea\",\n       \"last_name\": \" The Blues\",\n       \"user_name\": \"StandfordBridge\",\n       \"email\": \"Daniel\",\n       \"date_of_birth\": \"1970-01-01T00:00:01.916Z\",\n       \"follower\": [],\n       \"country\": \"England\",\n       \"city\": \"london\",\n       \"bio\": \"this is test bio abou anyone\",\n}\n{\n\n       \"_id\": \"58af8cbd7544b94c8fa864e7\",\n       \"first_name\": \"Chelsea\",\n       \"last_name\": \" The Blues\",\n       \"user_name\": \"StandfordBridge\",\n       \"email\": \"Daniel\",\n       \"date_of_birth\": \"1970-01-01T00:00:01.916Z\",\n       \"follower\": [],\n       \"country\": \"England\",\n       \"city\": \"london\",\n       \"bio\": \"this is test bio abou anyone\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "description": "<p>This endpoint is allow to update specific customer information.</p>",
    "type": "put",
    "url": "/customers/:id",
    "title": "Update Specfic customer",
    "name": "UpdateCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\n       \"_id\": \"58af8cbd7544b94c8fa864e7\",\n       \"first_name\": \"Chelsea\",\n       \"last_name\": \" The Blues\",\n       \"user_name\": \"StandfordBridge\",\n       \"email\": \"Daniel\",\n       \"date_of_birth\": \"1970-01-01T00:00:01.916Z\",\n       \"follower\": [],\n       \"country\": \"England\",\n       \"city\": \"london\",\n       \"bio\": \"this is test bio abou anyone\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "description": "<p>This endpoint is allow to Create Job Category</p>",
    "type": "post",
    "url": "/jobcategories",
    "title": "Create JobCategory",
    "name": "CreateJobCategory",
    "group": "JobCategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>JobCategory Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n  \"name\":  \"Economics\",\n  \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"Economics\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/jobcategory.js",
    "groupTitle": "JobCategory"
  },
  {
    "type": "delete",
    "url": "/jobcategories/:id",
    "title": "Delete Job Category",
    "name": "DeleteJobCategory",
    "group": "JobCategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>jobcategory Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"Chelsea\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/jobcategory.js",
    "groupTitle": "JobCategory"
  },
  {
    "description": "<p>This Endpoint is allow to Get All Job Catgory information.</p>",
    "type": "get",
    "url": "/jobcategories",
    "title": "Get All Job Category",
    "name": "GetJobCategories",
    "group": "JobCategory",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"JC1\",\n}\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"JC2\",\n}\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"JC3\",\n}\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"JC4\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/jobcategory.js",
    "groupTitle": "JobCategory"
  },
  {
    "description": "<p>This Endpoint is allow to get Specific Job Category</p>",
    "type": "get",
    "url": "/jobcategories/:id",
    "title": "Get Specfic Job Category",
    "name": "GetJobCategory",
    "group": "JobCategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Job Category Jd</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n{\n\"_id\": \"58af8cbd7544b94c8fa864e7\",\n \"name\": \"Chelsea\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/jobcategory.js",
    "groupTitle": "JobCategory"
  },
  {
    "type": "put",
    "url": "/jobcategories/:id",
    "title": "Update Job Category",
    "name": "UpdateJobCategory",
    "group": "JobCategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n \"name\":  \"aaaaaa\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n \n   \"_id\": \"58af8cbd7544b94c8fa864e7\",\n   \"name\": \"aaaaaa\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/jobcategory.js",
    "groupTitle": "JobCategory"
  },
  {
    "description": "<p>This Endpointis to acess all profile of staff or customer</p>",
    "type": "get",
    "url": "/profiles/:id",
    "title": "Get Profile",
    "name": "GetProfile",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Profile Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"58aa8e7e2001553674b9eb3c\",\n        \"first_name\": \"Samuel Etto\",\n        \"last_name\": \"Didder\",\n        \"email\": \"\",\n        \"date_of_birth\": \"1978-03-10T21:00:00.000Z\",\n        \"city\": \"Douala \",\n        \"country\": \"Cameroon\",\n        \"gender\": \"Male\",\n        \"bio\": \"Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.\",\n        \"last_modified\": \"2017-02-20T06:36:46.322Z\",\n        \"date_created\": \"2017-02-20T06:36:46.275Z\",\n        \"player\": \"58aa8e7e2001553674b9eb3d\"\n      }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "Profile"
  },
  {
    "description": "<p>This is the Endpoint to acess all profile  inforamtion</p>",
    "type": "get",
    "url": "/profiles",
    "title": "Get All Profiles",
    "name": "GetProfiles",
    "group": "Profile",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [ {\n     \"_id\": \"58aa8e7e2001553674b9eb3c\",\n        \"first_name\": \"Samuel Etto\",\n        \"last_name\": \"Didder\",\n        \"email\": \"\",\n        \"date_of_birth\": \"1978-03-10T21:00:00.000Z\",\n        \"city\": \"Douala \",\n        \"country\": \"Cameroon\",\n        \"gender\": \"Male\",\n        \"bio\": \"Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.\",\n        \"last_modified\": \"2017-02-20T06:36:46.322Z\",\n        \"date_created\": \"2017-02-20T06:36:46.275Z\",\n        \"player\": \"58aa8e7e2001553674b9eb3d\"\n      }\n      {\n     \"_id\": \"58aa8e7e2001553674b9eb3c\",\n        \"first_name\": \"Samuel Etto\",\n        \"last_name\": \"Didder\",\n        \"email\": \"\",\n        \"date_of_birth\": \"1978-03-10T21:00:00.000Z\",\n        \"city\": \"Douala \",\n        \"country\": \"Cameroon\",\n        \"gender\": \"Male\",\n        \"bio\": \"Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.\",\n        \"last_modified\": \"2017-02-20T06:36:46.322Z\",\n        \"date_created\": \"2017-02-20T06:36:46.275Z\",\n        \"player\": \"58aa8e7e2001553674b9eb3d\"\n      }\n  {\n     \"_id\": \"58aa8e7e2001553674b9eb3c\",\n        \"first_name\": \"Samuel Etto\",\n        \"last_name\": \"Didder\",\n        \"email\": \"\",\n        \"date_of_birth\": \"1978-03-10T21:00:00.000Z\",\n        \"city\": \"Douala \",\n        \"country\": \"Cameroon\",\n        \"gender\": \"Male\",\n        \"bio\": \"Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.\",\n        \"last_modified\": \"2017-02-20T06:36:46.322Z\",\n        \"date_created\": \"2017-02-20T06:36:46.275Z\",\n        \"player\": \"58aa8e7e2001553674b9eb3d\"\n      }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "Profile"
  },
  {
    "description": "<p>This  Endpoint is to update staff or customer  profile</p>",
    "type": "put",
    "url": "/profiles/:id",
    "title": "Update Profile",
    "name": "UpdateProfile",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"58aa8e7e2001553674b9eb3c\",\n        \"first_name\": \"Samuel Etto\",\n        \"last_name\": \"Didder\",\n        \"email\": \"\",\n        \"date_of_birth\": \"1978-03-10T21:00:00.000Z\",\n        \"city\": \"Douala \",\n        \"country\": \"Cameroon\",\n        \"gender\": \"Male\",\n        \"bio\": \"Samuel Eto'o Fils (French pronunciationHe was third in the FIFA.\",\n        \"last_modified\": \"2017-02-20T06:36:46.322Z\",\n        \"date_created\": \"2017-02-20T06:36:46.275Z\",\n        \"player\": \"58aa8e7e2001553674b9eb3d\"\n      }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "Profile"
  },
  {
    "description": "<p>This is the Endpoint to acess all staffs inforamtion</p>",
    "type": "get",
    "url": "/staff",
    "title": "Request All  Staff information",
    "name": "GetStaff",
    "group": "Staff",
    "version": "0.0.0",
    "filename": "routes/staff.js",
    "groupTitle": "Staff"
  },
  {
    "description": "<p>This is the Endpoint to acess specific staff inforamtion</p>",
    "type": "get",
    "url": "/staff/:id",
    "title": "Request specific  Staff information",
    "name": "GetStaff",
    "group": "Staff",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>Staff unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/staff.js",
    "groupTitle": "Staff"
  },
  {
    "description": "<p>This is the Endpoint to update specific staff inforamtion</p>",
    "type": "get",
    "url": "/staff/:id",
    "title": "Update specific  Staff information",
    "name": "UpdateStaff",
    "group": "Staff",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/staff.js",
    "groupTitle": "Staff"
  },
  {
    "description": "<p>This Endpoint is allow to  Change Password</p>",
    "type": "post",
    "url": "/users/passchange",
    "title": "Password Change",
    "name": "ChangePassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New Pasword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n \"old_password\":\"pass@1234\",\n \"new_password\":\"yonas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>This endpoint is allow to Signup</p>",
    "type": "post",
    "url": "/users/signup",
    "title": "Signup User",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>Users Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "realem",
            "description": "<p>Users Group</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>Users First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Users last_name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date_of_birth",
            "description": "<p>Users Date of Birth</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "city",
            "description": "<p>Users City</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "country",
            "description": "<p>Users Country</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "mobile",
            "description": "<p>Users Mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "gender",
            "description": "<p>Users Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_type",
            "description": "<p>User Type , Like Staff, customer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n  \"password\":\"pass@123\",\n  \"user_name\":\"yonas\",\n  \"first_name\":\"yonas\",\n  \"last_name\":\"engida\",\n  \"user_type\":\"staff\",\n  \"mobile\":\"0930015100\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n     {\n  \"_id\": \"589fb45b48baee02dc7c713b\",\n \"user_name\": \"Tsegaw\",\n  \"realm\": \"user\",\n  \"profile\": {\n    \"_id\": \"589fb45b48baee02dc7c713c\",\n    \"user\": \"589fb45b48baee02dc7c713b\",\n    \"first_name\": \"Tsegaw\",\n    \"last_name\": \"Tsegaw\",\n    \"email\": \"test@gmail.com\",\n  },\n  \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n  \"status\": \"active\",\n  \"role\": \"staff\"\n}\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete Specific User information",
    "name": "Delete",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n       {\n      \"_id\": \"589fb45b48baee02dc7c713b\",\n      \"user_name\": \"Tsegaw\",\n      \"realm\": \"user\",\n      \"profile\": {\n      \"_id\": \"589fb45b48baee02dc7c713c\",\n      \"user\": \"589fb45b48baee02dc7c713b\",\n      \"first_name\": \"Tsegaw\",\n      \"last_name\": \"Tsegaw\",\n      \"email\": \"test@gmail.com\",\n         },\n    \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n    \"status\": \"active\",\n    \"role\": \"staff\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Get Specific User Collection. To get Sepecific user information pass id  as parameter.</p>",
    "type": "get",
    "url": "/users/:id",
    "title": "Request Specific User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n       {\n    \"_id\": \"589fb45b48baee02dc7c713b\",\n    \"password\": \"passs@123@123\",\n    \"user_name\": \"Tsegaw\",\n    \"realm\": \"user\",\n     \"profile\": {\n      \"_id\": \"589fb45b48baee02dc7c713c\",\n      \"user\": \"589fb45b48baee02dc7c713b\",\n      \"first_name\": \"Tsegaw\",\n      \"last_name\": \"Tsegaw\",\n      \"email\": \"test@gmail.com\",\n   },\n    \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n    \"status\": \"active\",\n    \"role\": \"staff\"\n  }\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>This Endpoint is allow to Get All Users Information.</p>",
    "type": "get",
    "url": "/users",
    "title": "Request Users information",
    "name": "Get_All_Users",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n     {\n  \"_id\": \"589fb45b48baee02dc7c713b\",\n  \"user_name\": \"Tsegaw\",\n  \"realm\": \"user\",\n    \"profile\": {\n    \"_id\": \"589fb45b48baee02dc7c713c\",\n    \"user\": \"589fb45b48baee02dc7c713b\",\n    \"first_name\": \"Tsegaw\",\n    \"last_name\": \"Tsegaw\",\n    \"email\": \"test@gmail.com\",\n     },\n  \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n  \"status\": \"active\",\n  \"role\": \"staff\"\n}\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Get Users Collection by Pagination. Use below parameters to query with pagination :- page=&lt;RESULTS_PAGE&gt; and per_page=&lt;RESULTS_PER_PAGE&gt;.</p>",
    "type": "get",
    "url": "/users/paginate?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Users Collection by Pagination",
    "name": "Get_Users_Collection",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>Users Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users Password</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "realem",
            "description": "<p>Users Group</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>Users First Name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Users last_name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>Users email</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "date_of_birth",
            "description": "<p>Users Date of Birth</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "city",
            "description": "<p>Users City</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "country",
            "description": "<p>Users Country</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "mobile",
            "description": "<p>Users Mobile</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "gender",
            "description": "<p>Users Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user_type",
            "description": "<p>User Type , Like Staff, customer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n     {\n  \"_id\": \"589fb45b48baee02dc7c713b\",\n     \"user_name\": \"Tsegaw\",\n  \"realm\": \"user\",\n   \"profile\": {\n    \"_id\": \"589fb45b48baee02dc7c713c\",\n    \"user\": \"589fb45b48baee02dc7c713b\",\n    \"first_name\": \"Tsegaw\",\n    \"last_name\": \"Tsegaw\",\n    \"email\": \"test@gmail.com\",\n  \n  },\n  \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n  \"status\": \"active\",\n  \"role\": \"staff\"\n}\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>This endpoint is allow to login</p>",
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>Users Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n   \"user_name\":\"eagles-user\",\n   \"password\":\"dhjsdhjhdjhfajf\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n  \"token\": \"lxrF2tbwa7bCjnrMjE9P\",\n  \"user\": {\n        \"profile\": {\n          \"_id\": \"58afaeb061fffb6d17477be3\",\n               \"user\": \"58afaea861fffb6d17477be2\",\n               \"first_name\": \"SIMRET MOB1\",\n               \"last_name\": \"yohannes\",\n               \"last_modified\": \"2017-02-28T20:53:23.111Z\"\n            },\n            \"user_name\": \"simret\",\n            \"last_login\": \"2017-03-01T03:17:35.500Z\",\n            \"realm\": \"user\",\n            \"role\": \"customer\",\n             \"status\": \"active\",\n            \"date_created\": \"2017-02-24T03:55:28.307Z\",\n             \"last_modified\": \"2017-03-01T03:17:35.500Z\"\n        }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update Specific User information",
    "name": "UpdateUSer",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n \"user_name\":\"afrikik-user\",\n \"password\":\"dhjsdhjhdjhfajf\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n     {\n  \"_id\": \"589fb45b48baee02dc7c713b\",\n  \"password\": \"passs@123@123\",\n  \"user_name\": \"Tsegaw\",\n  \"realm\": \"user\",\n   \"profile\": {\n    \"_id\": \"589fb45b48baee02dc7c713c\",\n    \"user\": \"589fb45b48baee02dc7c713b\",\n    \"first_name\": \"Tsegaw\",\n    \"last_name\": \"Tsegaw\",\n    \"email\": \"test@gmail.com\",\n  \n  },\n  \"last_modified\": \"2017-02-12T01:03:23.983Z\",\n  \"status\": \"active\",\n  \"role\": \"staff\"\n}\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>This Endpoint is allow to create Vacancy</p>",
    "type": "post",
    "url": "/vacancies",
    "title": "Create Vacancy",
    "name": "CreateVacancy",
    "group": "Vacancy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Vacancy Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>Positions for vacancy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Vacancy Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_category",
            "description": "<p>Vacancy Job Category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "exprience",
            "description": "<p>Exprience</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qualification",
            "description": "<p>Qualification</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "due_date",
            "description": "<p>Vacancy Due Date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "salary",
            "description": "<p>Users Country</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "number_required",
            "description": "<p>Number_required for Position</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "contact",
            "description": "<p>Contact</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobile",
            "description": "<p>Mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lebel",
            "description": "<p>Level Like Diploma,Degree or Msc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "  {\n        \"code\":      \"code112232\",\n        \"position\":     \"position1\",\n        \"description\": \"descrption1\",\n        \"job_category\": \"jobcategory1\",\n        \"exprience\":   \"exprience1\",\n        \"qualifications\":\"qualification1\",\n        \"due_date\":  \"duedate\",\n        \"salary\":        \"salary1\",\n        \"number_required\":\"12\",\n        \"contact\":       \"0930015100\",\n        \"mobile\":     \"mobile1\",\n        \"email\":       \"email\",\n        \"level\":        \"level1\"\n\t\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n       \"_id\": \"58e1327663fed368a02a7f49\",\n       \"code\": \"code112232\",\n       \"position\": \"position1\",\n       \"description\": \"descrption1\",\n       \"exprience\": \"exprience1\",\n       \"qualifications\": \"qualification1\",\n       \"status\": \"status1\",\n       \"due_date\": \"duedate\",\n       \"salary\": \"salary1\",\n       \"number_required\": \"12\",\n       \"contact\": \"0930015100\",\n       \"mobile\": \"mobile1\",\n       \"email\": \"email\",\n       \"level\": \"level1\",\n       \"job_category\": []\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/vacancy.js",
    "groupTitle": "Vacancy"
  },
  {
    "description": "<p>This Endpoint is allow to get all vacancy collections.</p>",
    "type": "get",
    "url": "/vacancies",
    "title": "Get all Vacancy",
    "name": "GetVacancies",
    "group": "Vacancy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>vacancy Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"58e1327663fed368a02a7f49\",\n      \"code\": \"code112232\",\n      \"position\": \"position1\",\n      \"description\": \"descrption1\",\n      \"exprience\": \"exprience1\",\n      \"qualifications\": \"qualification1\",\n      \"status\": \"status1\",\n      \"due_date\": \"duedate\",\n      \"salary\": \"salary1\",\n      \"number_required\": \"12\",\n      \"contact\": \"0930015100\",\n      \"mobile\": \"mobile1\",\n      \"email\": \"email\",\n      \"level\": \"level1\",\n      \"job_category\": []\n  }\n  {\n      \"_id\": \"58e1327663fed368a02a7f49\",\n      \"code\": \"code112232\",\n      \"position\": \"position1\",\n      \"description\": \"descrption1\",\n      \"exprience\": \"exprience1\",\n      \"qualifications\": \"qualification1\",\n      \"status\": \"status1\",\n      \"due_date\": \"duedate\",\n      \"salary\": \"salary1\",\n      \"number_required\": \"12\",\n      \"contact\": \"0930015100\",\n      \"mobile\": \"mobile1\",\n      \"email\": \"email\",\n      \"level\": \"level1\",\n      \"job_category\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/vacancy.js",
    "groupTitle": "Vacancy"
  },
  {
    "description": "<p>This endpoint is allow to Get Specfic Vacancy Collection.</p>",
    "type": "get",
    "url": "/vacancies/:id",
    "title": "Get Specfic Vacancy",
    "name": "GetVacancy",
    "group": "Vacancy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>vacancy id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"58e1327663fed368a02a7f49\",\n      \"code\": \"code112232\",\n      \"position\": \"position1\",\n      \"description\": \"descrption1\",\n      \"exprience\": \"exprience1\",\n      \"qualifications\": \"qualification1\",\n      \"status\": \"status1\",\n      \"due_date\": \"duedate\",\n      \"salary\": \"salary1\",\n      \"number_required\": \"12\",\n      \"contact\": \"0930015100\",\n      \"mobile\": \"mobile1\",\n      \"email\": \"email\",\n      \"level\": \"level1\",\n      \"job_category\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/vacancy.js",
    "groupTitle": "Vacancy"
  },
  {
    "description": "<p>This Endpoint is allow to Get Vacancy Collection by Pagination. Use parameters to query with pagination :- page=&lt;RESULTS_PAGE&gt; and per_page=&lt;RESULTS_PER_PAGE&gt;.</p>",
    "type": "get",
    "url": "/vacancies/paginate?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Vacancy Collection by Pagination",
    "name": "GetVacancyByPagination",
    "group": "Vacancy",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Vacancy Code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>Positions for vacancy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Vacancy Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "job_category",
            "description": "<p>Vacancy Job Category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "exprience",
            "description": "<p>Exprience</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qualification",
            "description": "<p>Qualification</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "due_date",
            "description": "<p>Vacancy Due Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "salary",
            "description": "<p>Users Country</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "number_required",
            "description": "<p>Number_required for Position</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "contact",
            "description": "<p>Contact</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "mobile",
            "description": "<p>Mobile</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Level Like Diploma,Degree or Msc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"58e1327663fed368a02a7f49\",\n    \"code\": \"code112232\",\n    \"position\": \"position1\",\n    \"description\": \"descrption1\",\n    \"exprience\": \"exprience1\",\n    \"qualifications\": \"qualification1\",\n    \"status\": \"status1\",\n    \"due_date\": \"duedate\",\n    \"salary\": \"salary1\",\n    \"number_required\": \"12\",\n    \"contact\": \"0930015100\",\n    \"mobile\": \"mobile1\",\n    \"email\": \"email\",\n    \"level\": \"level1\",\n    \"job_category\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/vacancy.js",
    "groupTitle": "Vacancy"
  },
  {
    "description": "<p>This Endpoint is allow to update Vacancy Information.</p>",
    "type": "put",
    "url": "/vacancies/:id",
    "title": "Update Specfic Vacancy",
    "name": "UpdateVacancy",
    "group": "Vacancy",
    "parameter": {
      "examples": [
        {
          "title": "Request Exmaple",
          "content": "{\n      \"code\":      \"code112232\",\n      \"position\":     \"position1\",\n      \"description\": \"descrption1\",\n      \"job_category\": \"jobcategory1\",\n      \"exprience\":   \"exprience1\",\n      \"qualifications\":\"qualification1\",\n      \"due_date\":  \"duedate\",\n      \"salary\":        \"salary1\",\n      \"number_required\":\"12\",\n      \"contact\":       \"0930015100\",\n      \"mobile\":     \"mobile1\",\n      \"email\":       \"email\",\n      \"level\":        \"level1\"\n\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Data",
            "description": "<p>Update Data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"58e1327663fed368a02a7f49\",\n      \"code\": \"code112232\",\n      \"position\": \"position1\",\n      \"description\": \"descrption1\",\n      \"exprience\": \"exprience1\",\n      \"qualifications\": \"qualification1\",\n      \"status\": \"status1\",\n      \"due_date\": \"duedate\",\n      \"salary\": \"salary1\",\n      \"number_required\": \"12\",\n      \"contact\": \"0930015100\",\n      \"mobile\": \"mobile1\",\n      \"email\": \"email\",\n      \"level\": \"level1\",\n      \"job_category\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/vacancy.js",
    "groupTitle": "Vacancy"
  }
] });
