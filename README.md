
3. Setting up the Frontend (React + TypeScript)
Frontend (React)
Install Dependencies:

Navigate to the frontend directory and install dependencies:
cd frontend
npm install

Run the Frontend Locally:

To run the frontend locally:
npm start

Dockerize the Frontend:
docker build -t voting_frontend .
docker run -p 3000:3000 voting_frontend

4. Setting up the Blockchain (Substrate)
To interact with the blockchain, you can use Ganache or any Substrate node locally. For Ganache:

Install Ganache CLI:
npm install -g ganache-cli

Start the Blockchain:

Run Ganache CLI:
ganache-cli
This will start a local blockchain instance on http://localhost:8545.

Deploy Contracts Using Truffle:

In the voting_backend folder, deploy the smart contracts:
truffle migrate --network development


5. Running the Full Application
Start the Backend:

Either run the backend locally using cargo run or build and run the Docker container as described above.

Start the Frontend:

Either run the frontend locally using npm start or build and run the Docker container.

Interact with the Application:

Open the React app in your browser: http://localhost:3000
You should be able to select a candidate and cast your vote.
View Results:

To see the results, you can use the "Results" section of the frontend or make a GET request to http://localhost:8080/results to view all votes.

6. Database Configuration (Optional)
If you're using a database (e.g., MongoDB), ensure that you have the database running locally or in a container. Update your backend configuration in config.rs to connect to the database.

Troubleshooting
Ports Conflict: If you see a "port already in use" error, ensure no other service is running on port 8080 or 3000 and stop conflicting services.
Missing Modules: If you encounter missing module errors (e.g., dotenv or axios), install them using npm install or cargo install as needed.
CORS Issues: If the frontend cannot access the backend API, make sure CORS is enabled properly on the backend.