import regions from "./regions"

export default {
    "schema_name": "kallo_onboarding",
    "schema_version": "1.2.10",
    "platforms": [
        { 
            "platform_name": "AWS",
            "platform_value": "aws",
            "data_location": "offline",
            "fields": [
                {
                    "field_type": "select",
                    "field_name": "Database Service",
                    "value": "database_service",
                    "field_options": [
                        {
                            "option_name": "DynamoDB",
                            "option_value": "dynamodb",
                            "option_fields": [
                                {
                                    "type": "select",
                                    "name":"Region",
                                    "value": "region",
                                    "options": regions
                                   

                                },
                                {
                                    "type": "text",
                                    "name":"Access Key",
                                    "value":"access_key",
                                    "placeholder":"Access Key"

                                },
                                {
                                    "type": "text",
                                    "name":"Secret Key",
                                    "value":"secret_key",
                                    "placeholder":"Secret Key"

                                }
        
                            ]
                        },
                        {
                            "option_name": "RDS",
                            "option_value": "rds",
                            "option_fields": [
                                {
                                    "type": "select",
                                    "name":"Database Type",
                                    "value": "database_type",
                                    "options": [
                                        {
                                            "name": "PostgreSQL",
                                            "value": "postgresql"

                                        },
                                        {
                                           
                                            "name": "MySQL",
                                            "value": "mysql"
    
                                           
                                        }
                                    ]
                                   

                                },
                                {
                                    "type": "text",
                                    "name":"Connection String",
                                    "value":"connection_string",
                                    "placeholder": "postgresql+srv://username:password@host/database"

                                }
                            ]
                        }

                    ]
                }
            ]    
        },
        {
            "platform_name": "mongoDB",
            "platform_value": "mongodb",
            "data_location": "offline",
            "fields": [
                {
                    "field_type": "text",
                    "field_name": "Connection String",
                    "value": "connection_string",
                    "placeholder": "mongodb+srv://username:password@host/database?retryWrites=true&w=majority"
                }
            ]
        },
        {
            "platform_name": "MySQL",
            "platform_value": "mysql",
            "data_location": "online",
            "fields": [
                {
                    "field_type": "text",
                    "field_name": "Connection String",
                    "value": "connection_string",
                    "placeholder": "mongodb+srv://username:password@host/database?retryWrites=true&w=majority"
                }
            ]
        },
        {
            "platform_name": "PostgreSQL",
            "platform_value": "postgresql",
            "data_location": "online",
            "fields": [
                {
                    "field_type": "text",
                    "field_name": "Connection String",
                    "value": "connection_string",
                    "placeholder": "mongodb+srv://username:password@host/database?retryWrites=true&w=majority"
                }
            ]
        },
        {
            "platform_name": "Excel",
            "platform_value": "excel",
            "data_location": "offline",
            "fields": [
                {
                    "field_type": "file",
                    "field_name": "Select file",
                    "value": "file",
                    "placeholder": "C:/Users/sjfkldmd/csv"
                }
            ]
        },
        
    ]
   
}