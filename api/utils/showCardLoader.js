import CardLoader from "../../components/reusable/CardLoader";

export const showCardLoader = (setPage, page) => {
  return <CardLoader setPage={setPage} page={page} isCat={false}  />;
};
