import getSsrApi from 'utils/getSsrApi';
import { Context } from 'utils/typeContext';

export default function ({ searchList }) {
  const results = searchList.map((searchInfo) => <div>{searchInfo.title}</div>);

  return <div>{results}</div>;
}

export async function getServerSideProps(context: Context) {
  const response = await fetch(`${getSsrApi(context)}/search`);
  const { searchList } = await response.json();

  return {
    props: {
      searchList,
    },
  };
}
