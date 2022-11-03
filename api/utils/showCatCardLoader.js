import CardLoader from "../../components/reusable/CardLoader";

export const showCatCardLoader = (setPage, page, catId, setCatId) => {
  return <CardLoader setPage={setPage} page={page} isCat={true} catId={catId} setCatId={setCatId} />;
};
