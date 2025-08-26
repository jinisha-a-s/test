FROM node:18

# Set working directory
WORKDIR /app

# Copy the React artifact zip file
COPY artifact.zip ./artifact.zip

# Install unzip, gettext (for envsubst), and serve globally
RUN apt-get update && apt-get install -y unzip gettext-base && \
    npm install -g serve && \
    unzip artifact.zip -d . && \
    rm /app/artifact.zip

# Work inside dist folder
WORKDIR /app/kasadra_frontend/dist

# Copy entrypoint script
COPY kasadra_frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5173

# Run entrypoint which will generate config.js and then start serve
ENTRYPOINT ["/entrypoint.sh"]
CMD ["serve", "-s", ".", "-l", "5173"]





########################################################################################
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy the React artifact zip file
# COPY artifact.zip ./artifact.zip

# # Install unzip, serve globally, then unzip and handle app
# RUN apt-get update && apt-get install -y unzip && \
#     npm install -g serve && \
#     unzip artifact.zip -d . && \
#     rm /app/artifact.zip

# # Optional: If your artifact contains unbuilt src/, build it (only if needed)
# # RUN cd kasadra_frontend && npm install && npm run build

# # If already built (dist/ exists), skip build and just serve
# WORKDIR /app/kasadra_frontend/dist

# #Copy 

# EXPOSE 5173
# CMD ["serve", "-s", ".", "-l", "5173"]
