# 📊 Comparison of the state management libraries for React application

This repository contains the code and resources used in the experimental research for my thesis: **"Comparative Analysis of State Management Libraries in React Applications"**. The purpose of this study was to evaluate the effectiveness of different state management libraries in a controlled environment.

## 📝 Abstract

State management is a crucial aspect of developing React applications. However, research on comparing different state management libraries is limited. This study aims to bridge that gap by comparing various state management libraries based on key metrics: performance, package size, memory consumption, and ecosystem support.

For this purpose, a React e-commerce store was developed using the Saleor API as a back-end. This base application was cloned six times, with each instance utilizing a different state management library, maintaining consistent functionality and experience across all instances.

The findings provide valuable insights and practical recommendations that can help developers choose the most appropriate state management library for their specific project requirements.

## 📁 Project Structure

The repository is organized as follows:

- **/boilerplate**: The original React e-commerce application template.
- **/redux**: The version of the app using Redux for state management.
- **/mobx**: The version of the app using MobX for state management.
- **/useContext**: The version of the app using React's Context API.
- **/zustand**: The version of the app using Zustand for state management.
- **/jotai**: The version of the app using Jotai for state management.
- **/recoil**: The version of the app using Recoil for state management.
- **/\_\_results\_\_**: Contains screenshots from the experiments.
- **/thesis.pdf**: The full thesis document.

## ⚙️ Setup and Installation

### Running Saleor API

To run the application, you need a running Saleor API. The easiest way to set it up is by using the `saleor-platform`, a Dockerized package containing the core API, Saleor Dashboard, and other necessary services like the PostgreSQL database. Follow these steps:

1. Clone the `saleor-platform` repository:
   ```bash
   git clone https://github.com/saleor/saleor-platform
   cd saleor-platform
   ```
2. Build the Docker image:
   ```bash
   docker-compose build
   ```
3. Apply Django migrations:
   ```bash
   docker compose run --rm api python3 manage.py migrate
   ```
4. Populate the database and create an admin user:
   ```bash
   docker compose run --rm api python3 manage.py populatedb --createsuperuser
   ```
5. Start the Saleor API:

   ```bash
    docker compose up
   ```

   By default, the GraphQL API will be available at http://localhost:8000/graphql/, and the Saleor Dashboard will be accessible at http://localhost:9000/.

### Store Configuration

To configure the store for the experiments:

1. **Disable Email Confirmation for New Users**:
   For user registration to work without email confirmation, disable this requirement via the Saleor Dashboard:

   - Navigate to **Configuration** → **Site settings**.
   - Uncheck the "Require email confirmation" box.

2. **Payment Configuration** (Optional):
   To enable fully functional checkouts, configure a payment application. You can use the `saleor/dummy-payment-app` for this purpose ([Dummy Payment App](https://github.com/saleor/saleor-platform)):
   - Run the app locally and expose it via a tunneling service like `ngrok`.
   - Install the app in the Saleor Dashboard by providing the manifest URL in the format `{tunnel_url}/api/manifest`.

### Installing and Running the Applications

Once the Saleor API is running, follow these steps to set up and run the React applications:

1. Clone this repository:

   ```bash
   git clone https://github.com/Droniu/state-manager-comparison.git
   cd thesis-state-management-comparison
   ```

2. Install dependencies for each version:
   ```bash
   cd redux
   npm install
   ```
   Repeat for the other versions (`mobx`, `useContext`, `zustand`, `jotai`, `recoil`).
3. Run the application:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## 📊 Results Overview

### Bundle Size Comparison

The size of each state management library significantly impacts the overall bundle size of the application:

| Library     | Library Size (kB) | Project Size (kB) |
| ----------- | ----------------- | ----------------- |
| Redux       | 6200              | 552               |
| MobX        | 4718              | 593               |
| Context API | 0                 | 533               |
| Zustand     | 325               | 538               |
| Jotai       | 428               | 537               |
| Recoil      | 2210              | 609               |

### Performance Comparison

In terms of performance, measured by Lighthouse scores, there we no differences in TBT (Total Blocking Time) and LCP (Largest Contentful Paint):

| Library     | TBT (ms) | LCP (s) |
| ----------- | -------- | ------- |
| Redux       | 10       | 1.7     |
| MobX        | 10       | 1.7     |
| Context API | 10       | 1.7     |
| Zustand     | 10       | 1.7     |
| Jotai       | 10       | 1.7     |
| Recoil      | 10       | 1.7     |

### Memory Consumption Comparison

Memory consumption was evaluated on both Safari and Chrome:

| Library     | Memory Usage Safari (MB) | Memory Usage Chrome (MB) |
| ----------- | ------------------------ | ------------------------ |
| Redux       | 21.37                    | 7.59                     |
| MobX        | 23.97                    | 7.72                     |
| Context API | 23.54                    | 8.07                     |
| Zustand     | 20.18                    | 7.71                     |
| Jotai       | 22.32                    | 8.21                     |
| Recoil      | 22.73                    | 7.43                     |

Other results, such as state update time, re-renders and library popularity, are detailed in the full thesis document.

## 🌟 Recommendations

Based on the results, here are the recommendations for selecting a state management library:

- **Redux**: Ideal for developers who prefer a mature, well-tested solution, especially for large-scale applications.
- **MobX**: Best suited for those who favor object-oriented programming and class-based syntax.
- **Context API**: Recommended for small to moderate-sized applications focusing on minimal bundle size.
- **Zustand**: A good choice for simplicity and a balance between popularity and maturity while also minimizing bundle size.
- **Jotai**: Excellent for performance-oriented applications with a need for small bundle sizes and for developers exploring new solutions.
- **Recoil**: Not recommended due to lack of maintenance. Consider Jotai for a similar experience with better performance.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Michał Droń** - [Droniu](https://github.com/Droniu)

## 🙏 Acknowledgments

- Special thanks to my thesis advisor [dr inż. Tomasz Szandała](https://github.com/szandala) thanks to whom this project went seamlessly.
- Thanks to [WUST](https://pwr.edu.pl/en/) for providing the opportunity to conduct this research.
- Thanks to the [Saleor team](https://github.com/saleor) for developing the amazing API used in this project.
- Thanks to all the contributors of the state management libraries evaluated in this study.
