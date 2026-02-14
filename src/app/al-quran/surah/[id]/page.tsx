import AlQuranReaderTemplate from "../../_components/AlQuranReaderTemplate";
import { fetchSurahDetail } from "~/services/alQuranService";

const DetailSurahPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id ?? "";
  const data = await fetchSurahDetail(Number(id));

  return <AlQuranReaderTemplate data={data} type="surah" />;
};

export default DetailSurahPage;
