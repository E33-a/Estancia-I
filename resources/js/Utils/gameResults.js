import axios from "axios";

export async function saveGameResult({
  resultUuid,
  gameKey,
  score,
  livesRemaining,
  elapsedSeconds,
  won,
}) {
  const response = await axios.post(route("games.results.store"), {
    result_uuid: resultUuid,

    game_key: gameKey,

    score,

    lives_remaining: livesRemaining,

    elapsed_seconds: elapsedSeconds,

    won,
  });

  return response.data;
}
