## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the server on $PORT or defaults to port 5000 if no $PORT is specified with live code reload


### `npm start`

Starts the server on $PORT or defaults to port 5000 if no $PORT is specified without live code reload


### ENDPOINTS
    -/api/v1/login
        {
            "email": String,
            "password": String
        }


    -/api/v1/create-user
        {
	        "firstName": String,
	        "lastName": String,
            "email": String,
            "password": String,
            "phoneNumber":String
            optional - "roles": [{type:'student'},{type:'admin'},{type:'tutor'} //without specified roles, user will be a student
        }


    -/api/v1/get-sessions-in-range !!requires JWT
        {
	        "endTime": JS Datetime,
	        "startTime": JS Datetime
        }


    -/api/v1/get-session !!requires JWT
        required params
        {
            "sessionId": GUID of Session
        }
