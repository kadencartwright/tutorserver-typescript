## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the server on $PORT or defaults to port 5000 if no $PORT is specified with live code reload


### `npm start`

Starts the server on $PORT or defaults to port 5000 if no $PORT is specified without live code reload


### ENDPOINTS
    POST request
    -/api/v1/auth/login
        {
            "email": String,
            "password": String
        }

    POST request
    -/api/v1/auth/create-user
        {
	        "firstName": String,
	        "lastName": String,
            "email": String,
            "password": String,
            "phoneNumber":String
            optional - "roles": [{type:'student'},{type:'admin'},{type:'tutor'} //without specified roles, user will be a student
        }

    GET request
    -/api/v1/sessions-in-range !!requires JWT
        {
	        "endTime": js datetime converted to milliseconds,
	        "startTime": js datetime converted to milliseconds
        }

    GET request
    -/api/v1/session !!requires JWT
        required params
        {
            "sessionId": GUID of Session
        }
