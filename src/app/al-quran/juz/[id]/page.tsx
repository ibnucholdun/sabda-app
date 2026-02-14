import AlQuranReaderTemplate from "../../_components/AlQuranReaderTemplate";
import { fetchJuzDetail } from "~/services/alQuranService";

const DetailJuzPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id ?? "";
  const data = await fetchJuzDetail(Number(id));

  return <AlQuranReaderTemplate data={data} type="juz" />;
};

export default DetailJuzPage;
