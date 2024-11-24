import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { listUserfail, listUsersuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Updatelisting = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    address: "",
    price: "",
    discountprice: "",
    bedroom: "",
    bathroom: "",
    Type: "",

    parking: false,
    furnished: false,
    discount: false,
  });
  const [images, setImages] = useState([]);
  const { currentUser, error } = useSelector((state) => state.user);
  const [tempImages, setTempImages] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchlist = async () => {
      const listid = params.listId;
      console.log(listid);
      const res = await fetch(`http://localhost:3000/api/list/get/${listid}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchlist();
  }, []);

  // Handle changes to form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle listing type checkbox selection
  const handleListingTypeChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      Type: checked ? name : "", // Set to the selected type or reset if unchecked
    });
  };

  // Handle file input changes for images
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Combine new files with existing images
    const updatedImages = [...images, ...selectedFiles];

    // Limit to a maximum of 6 images
    if (updatedImages.length > 6) {
      alert("You can only select up to 6 images.");
      return;
    }

    setTempImages(selectedFiles);
  };
  const handleUploadImages = () => {
    // Combine images and tempImages, ensuring no more than 6 total
    const updatedImages = [...images, ...tempImages].slice(0, 6);
    setImages(updatedImages); // Update images with the final list
    setTempImages([]); // Clear tempImages after upload
  };

  // Delete selected image from images array
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Update state with filtered images
  };

  // Submit form data and images to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append form data fields (from your state or input fields)
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append images to FormData
    Array.from(images).forEach((image) => {
      data.append("listingImage", image); // Make sure this key matches your backend
    });

    // Get the JWT token from localStorage or cookies
    //    // Helper function to get a cookie value by name
    // const getCookie = (name) => {
    //   const value = `; ${document.cookie}`;
    //   const parts = value.split(`; ${name}=`);
    //   if (parts.length === 2) return parts.pop().split(';').shift();
    // };

    // // Use this function to get your token
    // const token = getCookie('access_token'); // replace 'token' with the actual name of your token cookie
    // console.log(token);

    //    // const token =  currentUser?.token;; // Or wherever you're storing it

    //     if (!token) {
    //       console.error("No authentication token found!");
    //       return;
    //     }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/list/update/${params.listId}`,
        data,
        {
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );
      console.log("Listing created:", response.data);
      navigate(`/listing/${response.data._id}`);
    } catch (error) {
      console.error(
        "Error creating listing:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg "
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength="60"
            minLength="5"
            required
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg "
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg "
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className=" gap-2">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                checked={formData.Type === "sale"}
                onChange={handleListingTypeChange}
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className=" gap-2">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                checked={formData.Type === "rent"}
                onChange={handleListingTypeChange}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className=" gap-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                checked={formData.parking}
                onChange={handleInputChange}
                className="w-5"
              />
              <span>Parking Spot</span>
            </div>
            <div className=" gap-2">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                checked={formData.furnished}
                onChange={handleInputChange}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className=" gap-2">
              <input
                type="checkbox"
                id="discount"
                name="discount"
                checked={formData.discount}
                onChange={handleInputChange}
                className="w-5"
              />
              <span>Discount</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                name="bedroom"
                min="1"
                max="10"
                value={formData.bedroom}
                onChange={handleInputChange}
                required
                className=" p-3 border border-gray-100 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathroom"
                name="bathroom"
                min="1"
                max="10"
                value={formData.bathroom}
                onChange={handleInputChange}
                required
                className=" p-3 border border-gray-100 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                max="10000"
                value={formData.price}
                onChange={handleInputChange}
                required
                className=" p-3 border border-gray-100 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className=" text-xs">($ /month)</span>
              </div>
            </div>
            {formData.discount && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountprice"
                  name="discountprice"
                  min="1"
                  max="10000"
                  value={formData.discountprice}
                  onChange={handleInputChange}
                  required
                  className=" p-3 border border-gray-100 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className=" text-xs">($ /month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className=" font-semibold ">
            Image :
            <span className=" font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={handleUploadImages}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>

          {/* Display selected images with delete option */}

          {images.length > 0 &&
            Array.from(images).map((image, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`image-${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="p-3 text-red-700 t\  rounded-lg uppercase hover: opacity-75"
                >
                  delete
                </button>
              </div>
            ))}

          <button
            type="submit"
            className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            edit Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default Updatelisting;
