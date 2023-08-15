import { APIRequestContext } from "@playwright/test";
import * as fs from "fs";

export class FigmaDownloader {
    public static generateSnapshotFolder(dir: string) {
        fs.rmSync(dir, { recursive: true, force: true });
        fs.mkdirSync(dir);
    }

    public static async getImageFromFigmaNode(request: APIRequestContext, figmaID: string, node: string, token: string): Promise<string> {
        const response = await request.get(`https://api.figma.com/v1/images/${figmaID}?ids=${node}`, {
            headers: {
              "X-Figma-Token": token
          }});
        const json = await response.json();
        return json.images[node.replace('-', ':')];
    }

    public static async writeFigmaImage(request: APIRequestContext, imageURL: string, path: string) {
        const response = await request.get(imageURL, {
            headers: {
              'Content-Type': 'image/png',
          }});
        const body = await response.body();
        await this.writeFile(path, body, 438);
    }
    
    private static async writeFile(path: string, buffer: Buffer, permission: number) {
        permission = permission || 438; // 0666
        var fileDescriptor;
    
        try {
            fileDescriptor = fs.openSync(path, 'w', permission);
        } catch (e) {
            fs.chmodSync(path, permission);
            fileDescriptor = fs.openSync(path, 'w', permission);
        }
    
        if (fileDescriptor) {
            fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
            fs.closeSync(fileDescriptor);
        }
    }
}