#[macro_use]
extern crate router;

#[macro_use]
extern crate iron;

extern crate rustc_serialize;
extern crate steam;

use std::fs::File;
use rustc_serialize::json;

use iron::prelude::*;
use iron::headers::ContentType;
use iron::mime::{Mime, TopLevel, SubLevel};
use iron::status;

#[derive(RustcEncodable)]
pub struct ApiResponse {
  success: bool,
  data: Vec<steam::api::GameData>
}

fn main() {
  Iron::new(router!(
    index: get "/" => |_: &mut Request| {
      let ind = iexpect!(File::open("index.html").ok(), (status::Ok, ""));
      Ok(Response::with((
        ContentType::html().0,
        status::Ok,
        ind
      )))
    },
    public: get "/public/*.js" => |req: &mut Request| {
      let path = req.url.path().join("/");
      let file = iexpect!(File::open(path).ok(), (status::Ok, ""));
      Ok(Response::with((
        ContentType(Mime(TopLevel::Application, SubLevel::Javascript, vec![])).0,
        status::Ok,
        file
      )))
    },
    // test: get "/test" => |_: &mut Request| {
    //   let id = steam::api::resolve_vanity("mimbsky");
    //   Ok(Response::with((status::Ok, id)))
    // },
    api: get "/api/games" => |req: &mut Request| {
      let query = req.url.query();
      if query.is_none() {
        Ok(Response::with((
          status::BadRequest,
          ""
        )))
      } else {
        let id = steam::api::resolve_vanity(query.unwrap());
        let games = steam::api::owned_games_for(&id);
        let api = ApiResponse {
          success: true,
          data: games
        };
        Ok(Response::with((
          ContentType::json().0,
          status::Ok,
          json::encode(&api).unwrap()
        )))
      }
    }
  )).http("localhost:3000").unwrap();
}