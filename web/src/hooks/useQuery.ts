export default function useQuery(url: string) {
  return new URLSearchParams(url);
}
