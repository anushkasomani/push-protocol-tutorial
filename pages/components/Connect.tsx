import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from "@web3-react/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from "wagmi";
import { Button, Text, VStack } from "@chakra-ui/react";
import Notifications from '../notifications/Notifications';
import { useState } from 'react';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 37, 80001],
});

const Auth = () => {
  const { active, account, activate } = useWeb3React();
  const { isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  
 
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  
  const handleButtonClick = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
  };

  async function connect() {
    try {
      await activate(injected);
      console.log(injected);
    } catch (err) {
      console.log(err);
    }
  }

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
              <Button onClick={handleButtonClick} colorScheme="messenger">
                See Notifications
              </Button>
              {isNotificationsVisible && <Notifications />}
            </>
          ) : null}
        </VStack>
      )}
    </div>
  );
};

export default Auth;
