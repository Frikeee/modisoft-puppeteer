# Important information
- **Every time the script is run again, the json files and database are erased and overwritten, so please save them if necessary.**

# Pre-Requirements
- Node.js
- MySQL
- MySQL Workbench - if you need to generate ER diagram

# Database setup instructions
- After copying the project, type ‘npm i’  in the project root to install all dependencies
- Create a '.env' file similar to '.env.example'
- Change the fragments 'userName', 'password', 'dbName' in the variable 'DATABASE_URL' of the file '.env'
- Apply the migration with the command 'npx prisma db push'

# Launch instructions
- Go to the 'src' folder with 'cd src'
- Run with command 'node index.js'

## P.s
- The script execution time is about 8 hours.
- It is advisable not to perform any actions on the site while the script is running.
