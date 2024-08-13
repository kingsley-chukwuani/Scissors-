
# Scissor URL Shortener

Scissor is a simple and powerful URL shortening service built with Node.js and TypeScript. It allows users to shorten URLs, customize shortened URLs, generate QR codes, and track analytics. Scissor aims to disrupt the URL-shortening industry with its user-friendly interface and robust features.

## Features

- **URL Shortening**: Shorten long URLs into easy-to-share links.
- **Custom URLs**: Create custom, branded short URLs.
- **QR Code Generation**: Generate QR codes for shortened URLs.
- **Analytics**: Track clicks and view performance analytics for your shortened URLs.
- **Link History**: View the history of all the links you've created.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [MongoDB](https://www.mongodb.com/) (locally or via a cloud provider like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/scissor-url-shortener.git
   cd scissor-url-shortener
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of your project and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/scissor
   PORT=5000
   ```

   Replace the `MONGO_URI` with your actual MongoDB connection string.

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. For development mode with hot-reloading:

   ```bash
   npm run dev
   ```

### Testing

To run the tests, use the following command:

```bash
npm test
```

### API Endpoints

Here are the primary API endpoints:

- **POST /api/shorten**
  - Shorten a URL or create a custom short URL.
  - **Request Body**:
    ```json
    {
      "originalUrl": "https://example.com",
      "customUrl": "mycustomalias"
    }
    ```
  - **Response**:
    ```json
    {
      "shortUrl": "http://localhost:5000/mycustomalias",
      "customUrl": "mycustomalias"
    }
    ```

- **GET /api/:shortUrl**
  - Redirects to the original URL.
  - **Response**: Redirects to the original URL.

- **GET /api/qr/:shortUrl**
  - Generate a QR code for a shortened URL.
  - **Response**:
    ```json
    {
      "qrCode": "<base64-encoded-qr-code>"
    }
    ```

- **GET /api/history**
  - Retrieve the history of all shortened URLs.
  - **Response**:
    ```json
    [
      {
        "_id": "unique-id",
        "originalUrl": "https://example.com",
        "shortUrl": "mycustomalias",
        "clicks": 10,
        "createdAt": "2024-08-01T10:12:34.567Z"
      }
    ]
    ```

### Project Structure

```
scissor-url-shortener/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── urlController.ts
│   ├── middlewares/
│   │   └── rateLimiter.ts
│   ├── models/
│   │   └── urlModel.ts
│   ├── routes/
│   │   └── urlRoutes.ts
│   ├── services/
│   │   └── urlService.ts
│   ├── utils/
│   │   └── validateUrl.ts
│   ├── __tests__/
│   │   └── urlService.test.ts
│   ├── app.ts
│   └── index.ts
│
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── ...
```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements, bug fixes, or new features.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

