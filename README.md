# Graphketing React Native Interview Task

## Overview
This project is a React Native CLI application built as part of the practical interview task.

It includes:
- Paginated comments list using FlatList
- Infinite scrolling (10 items per page)
- Comment detail screen with navigation params
- Error handling with retry
- Reusable components
- Custom hook based pagination logic
- FlatList performance optimizations

## Bonus Features
- Pull to refresh
- Search by name/email
- Skeleton loaders

## Tech Stack
- React Native CLI
- JavaScript
- React Navigation Native Stack
- Fetch API
- React Hooks

## Project Structure
src/
- screens
- components
- api
- navigation
- theme
- hooks

## Setup
Install dependencies:

npm install

## Run Android
npx react-native run-android

## API Used
https://jsonplaceholder.typicode.com/comments

Pagination:
https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10

## Features Implemented
- Initial loader
- Infinite scroll pagination
- Bottom loading indicator
- Error state with retry
- Detail screen via params
- React.memo optimization
- useCallback and useMemo
- Custom hook architecture

## Assumptions / Trade-offs
- Used JavaScript (allowed by assignment; TypeScript was preferred bonus)
- Used fetch instead of axios
- Unit tests not included (optional bonus)
- Focused on performance and clean architecture over additional libraries

## Screenshots / Recording
(Add screenshots or screen recording here)