import CardLoader from "../../components/reusable/CardLoader";

export const showCardLoader = (setPage, page, data) => {
  if (data.length) {
    return <CardLoader setPage={setPage} page={page} />;
  }
};
