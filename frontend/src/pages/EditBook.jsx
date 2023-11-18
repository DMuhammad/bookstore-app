import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleEditBook = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, book)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check console", {
          variant: "error",
        });
        console.error(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook({
          title: res.data.title,
          author: res.data.author,
          publishYear: res.data.publishYear,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.error(err);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] px-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={book.title}
            name="title"
            onChange={handleChange}
            className="border-2 border-gray-500 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={book.author}
            name="author"
            onChange={handleChange}
            className="border-2 border-gray-500 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={book.publishYear}
            name="publishYear"
            onChange={handleChange}
            className="border-2 border-gray-500 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
