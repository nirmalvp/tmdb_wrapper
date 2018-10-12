
# TMDB UI Wrapper

A Simple UI that utilizes the TMDB API underneath.

### Technology

- ReactJS

## Instructions
- Clone the repo
  ```
  git clone https://github.com/nirmalvp/tmdb_wrapper
  ```
- Run `docker build . -t tmdb_wrapper` to build the docker image once.
- Run
  ```
  docker run -it --rm -d \
  -p3000:3000 \
  -e REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE \
  tmdb_wrapper
  ```
- Vist [localhost:3000](http://localhost:3000)

## Credits
* https://sweetpumpkins.codecamps.com/
