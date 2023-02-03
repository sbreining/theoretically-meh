import { Cmd } from "../entities/cmd";

export async function getCmd(cmd: string): Promise<Cmd> {
  return await Cmd.findOneBy({ cmd });
}

export async function upsertCmd(cmd: string, response: string): Promise<void> {
  let row = await getCmd(cmd);

  if (!row) row = new Cmd(cmd);

  row.response = response;

  await row.save();
}

export async function deleteCmd(cmd: string): Promise<void> {
  await Cmd.delete({ cmd });
}
