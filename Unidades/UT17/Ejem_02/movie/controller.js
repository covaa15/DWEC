import { getAll, get } from './model.js';
 
export async function listAction(request, response) {
  const movies = await getAll(1);
  const moviesResponse = {
    movies,
    links: [{ rel: 'self', href: request.baseUrl + '/' }],
  };
  response.json(moviesResponse);
} 
export async function detailAction(request, response) {
  console.log('detailAction called with id:', request.params.id);
const movie = await get(request.params.id, 1);
const moviesResponse = {
...movie,
links: [{ rel: 'self', href: `${request.baseUrl}/${movie.id}` }],
};
response.json(moviesResponse);
}  
