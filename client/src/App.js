import { Fragment, useState } from 'react';
import Pagination from '@mui/material/Pagination';

function App() {

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  
  

  const onButtonClick = async e => {
    try {
      const response = await fetch(`http://localhost:3000/?page=${currentPage}&items=15&input=${search}`);
      const parseResponse = await response.json();
      setPosts(parseResponse.data.posts)
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    onButtonClick(e);
  }
  return (

<Fragment>
      <div className="container text-center">
        <h1 className="my-5">Posts List</h1>

    <input
            type="text"
            name="input"
            placeholder="Enter input ..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
      <button onClick={onButtonClick} className="btn btn-success">Submit</button>

    <table className="table my-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Score</th>
              <th>Owner</th>
              <th>Body</th>
              <th>Answer Count</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.score}</td>
                <td>{post.owneruserid}</td>
                <td>{post.body}</td>
                <td>{post.answercount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p>No Results Found</p>}
    </div>
    <Pagination count={10} page ={currentPage} onChange={handlePageChange} variant="outlined" color="primary" />
    </Fragment>

  );
}


export default App;
