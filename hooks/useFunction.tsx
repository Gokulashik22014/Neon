import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const useFunction = (fn: any) => {
  const [data, setData] = useState<
    Models.Document[] | Models.Document | undefined
  >([]);
  const getData = async () => {
    await fn()
      .then((res: Models.Document[] | Models.Document | undefined) =>
        setData(res)
      )
      .catch((error: any) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);
  const refetch = () => getData();
  return { data, refetch };
};
export default useFunction;
