import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [refreshData, setRefreshData] = useState(false);
  const [datas, setDatas] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const canonicalUrl = process.env.NEXT_PUBLIC_Website_URL + `${router.asPath}`;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Collecting the data from the form
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  // To prevent the page from reloading when the form is submitted
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
        });
        setRefreshData((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
        });
        setRefreshData((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateHandler = async (id) => {
    try {
      const res = await fetch("/api/done", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isCompleted: true,
        }),
      });

      if (res.ok) {
        setDataChanged(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatas = async () => {
    try {
      const response = await fetch("/api/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await response.json();
      setDatas(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, [router, refreshData]);

  useEffect(() => {
    if (dataChanged) {
      fetchDatas();
      setDataChanged(false); // Reset dataChanged after triggering data fetch
    }
  }, [dataChanged]);

  return (
    <>
      <NextSeo
        title="Nextjs Starter Modified"
        description="Your_Website_Description"
        canonical={canonicalUrl}
        openGraph={{
          url: { canonicalUrl },
          title: "Nextjs Starter Modified",
          description: "Your_Page_Description",
        }}
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-16 px-2 mx-auto"
      >
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full rounded"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 rounded w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white w-full rounded"
        >
          Add Task
        </button>
      </form>
      <div className="relative overflow-x-auto mt-16 w-[60%] mx-auto rounded">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-800 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {datas.map((data, index) => (
                <tr className="text-gray-600 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{data.title}</td>
                  <td className="px-6 py-4">{data.description}</td>
                  <td className="px-6 py-4">
                    {data.isCompleted ? "Completed" : "Pending"}
                  </td>
                  <td className="px-6 py-4 flex gap-1">
                    <button
                      className="py-2 px-4 bg-red-600 text-white rounded"
                      onClick={() => onDeleteHandler(data._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="py-2 px-4 bg-green-600 text-white rounded"
                      onClick={() => onUpdateHandler(data._id)}
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
}
