import { Cmd } from "../entities/cmd";

/**
 * Finds the command by the command.
 *
 * @param {string} cmd - The command to search the DB for.
 * @returns {Promise<Cmd>} - The command object.
 */
export async function getCmd(cmd: string): Promise<Cmd> {
  return await Cmd.findOneBy({ cmd });
}

/**
 * If the command does not exist, insert a new one. If it does exist, update the
 * response message.
 *
 * @param {string} cmd - The command that will be used in chat.
 * @param {string} response - The response when the command is entered.
 */
export async function upsertCmd(cmd: string, response: string): Promise<void> {
  let row = await getCmd(cmd);

  if (!row) row = new Cmd(cmd);

  row.response = response;

  await row.save();
}

/**
 * Deletes a row from the database by `cmd`.
 *
 * @param {string} cmd - The command to indentify which row to delete.
 */
export async function deleteCmd(cmd: string): Promise<void> {
  await Cmd.delete({ cmd });
}
