import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from "@web3-react/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from "wagmi";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from 'react';
import * as PushAPI from '@pushprotocol/restapi';


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 37, 80001, 11155111],
});

const Auth = () => {
  
  const { active, account, activate } = useWeb3React();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const handleButtonClick = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
  };

  async function connect() {
    try {
      await activate(injected);
      console.log("injected is",injected);
    } catch (err) {
      console.error(err);
    }
  }
   
  
  const sendNotif = async () => {
    
    
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: account,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: 'test',
          body: 'this is a test',
        },
        payload: {
          title: 'msg title',
          body: 'sample msg body',
          cta: '',
          img: '',
        },
        recipients:'eip155:11155111:0x8dA7936deBca60c98A0F6Eb0142990027986f959', // recipient address
        channel: `eip155:11155111:${account}`,
        env: 'staging',
      });
  
      console.log("API Response:", apiResponse);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  

  return (
    <div>
     
      {active && isConnected ? (
        <VStack>
          <Text fontSize="xl">
            Connected with: <br />
            {account}
          </Text>
          <Button onClick={() => disconnect()} colorScheme="messenger">
            Disconnect Metamask
          </Button>
        </VStack>
      ) : (
        <VStack>
          <ConnectButton />
          {isConnected ? (
            <>
              <Button onClick={connect}>
                Event Page
              </Button>
              {/* {isNotificationsVisible && <Notifications />} */}
              <Button onClick={sendNotif}> 
                Send Notifications
              </Button>
            </>
          ) : null}
        </VStack>
      )}
    </div>
  );
};

export default Auth;
