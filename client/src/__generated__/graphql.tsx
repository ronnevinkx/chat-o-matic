import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MessageInput = {
  text: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  deleteMessage: Scalars['Boolean'];
  deleteMessages: Scalars['Boolean'];
  updateMessage?: Maybe<Message>;
};


export type MutationCreateMessageArgs = {
  messageInput: MessageInput;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  id: Scalars['String'];
  messageInput: MessageInput;
};

export type Query = {
  __typename?: 'Query';
  message?: Maybe<Message>;
  messages: Array<Message>;
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated: Message;
};

export type MessageSnippetFragment = { __typename?: 'Message', _id: string, text: string, createdBy: string, updatedAt: any, createdAt: any };

export type CreateMessageMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', _id: string, text: string, createdBy: string, updatedAt: any, createdAt: any } };

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', _id: string, text: string, createdBy: string, updatedAt: any, createdAt: any }> };

export type MessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageCreatedSubscription = { __typename?: 'Subscription', messageCreated: { __typename?: 'Message', _id: string, text: string, createdBy: string, updatedAt: any, createdAt: any } };

export const MessageSnippetFragmentDoc = gql`
    fragment MessageSnippet on Message {
  _id
  text
  createdBy
  updatedAt
  createdAt
}
    `;
export const CreateMessageDocument = gql`
    mutation CreateMessage($messageInput: MessageInput!) {
  createMessage(messageInput: $messageInput) {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      messageInput: // value for 'messageInput'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const MessagesDocument = gql`
    query Messages {
  messages {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageCreatedDocument = gql`
    subscription MessageCreated {
  messageCreated {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

/**
 * __useMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>(MessageCreatedDocument, options);
      }
export type MessageCreatedSubscriptionHookResult = ReturnType<typeof useMessageCreatedSubscription>;
export type MessageCreatedSubscriptionResult = Apollo.SubscriptionResult<MessageCreatedSubscription>;