import { APIRequestContext } from "@playwright/test";

export class NodeController {
  constructor(private request: APIRequestContext) {}

  async createNode(nodeData: object) {
    return await this.request.post("/api/v1/node", {
      data: nodeData,
    });
  }

  async getNode(id: number) {
    return await this.request.get(`/api/v1/node/${id}`);
  }

  async updateNode(id: number, updatedData: object) {
    return await this.request.put(`/api/v1/node/${id}`, {
      data: updatedData,
    });
  }

  async deleteNode(id: number) {
    return await this.request.delete(`/api/v1/node/${id}`);
  }

  async downloadNode(id: number) {
    return await this.request.get(`/api/v1/node/${id}/params/download`);
  }

  async getNodeFullLogs(id: number) {
    return await this.request.get(`/api/v1/node/${id}/logs/full`);
  }

  async getNodeFeatures(id: number) {
    return await this.request.get(`/api/v1/node/${id}/feature`);
  }
}