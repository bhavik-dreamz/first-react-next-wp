import Home from "../pages";
import client from "./client";
import { gql } from "@apollo/client";


const BASE_URL = "https://dddemo.net/wordpress/2022/awd/wp-json/wp/v2";

async function safeFetchJson(url) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return null;
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getHome()
{
  const data = await safeFetchJson(BASE_URL + "/pages/81");
  return data || null;
}

export async function getPosts() {
  const posts = await safeFetchJson(BASE_URL + "/posts?_embed");
  return Array.isArray(posts) ? posts : [];
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}
export async function getEvents() {
  const events = await safeFetchJson(BASE_URL + "/events?_embed");
  return Array.isArray(events) ? events : [];
}

export async function getEvent(slug) {
  const events = await getEvents();
  const eventArray = events.filter((event) => event.slug == slug);
  const event = eventArray.length > 0 ? eventArray[0] : null;
  return event;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case "posts":
      elements = await getPosts();
      break;
    case "events":
      elements = await getEvents();
      break;
  }
  const elementsIds = (elements || []).map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}

