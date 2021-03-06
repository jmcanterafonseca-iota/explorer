import { IMessageMetadata } from "@iota/iota2.js";
import { IResponse } from "../IResponse";

export interface IMessageDetailsResponse extends IResponse {
    /**
     * Message metadata.
     */
    metadata?: IMessageMetadata;

    /**
     * Message ids for the children.
     */
    childrenMessageIds?: string[];
}
