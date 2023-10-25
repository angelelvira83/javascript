import { ensureFile } from "https://deno.land/std/fs/mod.ts"

function File() {

    async function write(file, text) {
        await ensureFile(file)
        return Deno.writeTextFile(file, text)
    }

    async function read(file) {
        return Deno.readTextFile(file)
    }

    return {
        write,
        read
    }
}

export default File()