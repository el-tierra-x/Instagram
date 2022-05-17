# Choices made in the app with their reasoning
1.   Only caching upto 5 pages of random fetch , then all later ones are freshly fetched
2.   Timing of cache is 1 hour , so that the api quota regenerates for new requests.
3.   Using id for preview rather than index , because at one point of time there are not going to be more than 100 images , so using filter against indexing will not eat up optimisation as much and also limits extra work.
4.   ~~Caching all users upto 5 , then removing first user and replacing its cache with the new user.~~
5. not caching usernames , only photos. Using an existing list of users for placeholder display and caching the visited users.

hello world

added serviceworker