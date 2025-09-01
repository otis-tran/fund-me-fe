'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { Wallet, Menu, X, Zap, DollarSign } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 11155111:
        return 'Sepolia';
      case 137:
        return 'Polygon';
      default:
        return 'Unknown';
    }
  };

  const getNetworkColor = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'bg-blue-500';
      case 11155111:
        return 'bg-purple-500';
      case 137:
        return 'bg-purple-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-black backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-slate-900 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">FundMe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* Wallet Info & Connect Button */}
          <div className="flex items-center space-x-4">
            {/* Network Indicator */}
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${getNetworkColor(chainId)}`}
                />
                <span className="text-sm text-slate-400">
                  {getNetworkName(chainId)}
                </span>
              </div>
            )}

            {/* Balance Display */}
            {isConnected && balance && (
              <div className="hidden lg:flex items-center space-x-2 glass-dark px-3 py-1.5 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-slate-200">
                  {formatBalance(balance.formatted)} {balance.symbol}
                </span>
              </div>
            )}

            {/* Connect Button */}
            <div className="hidden md:block">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted: rainbowMounted,
                }) => {
                  const ready =
                    rainbowMounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="btn-primary space-x-2"
                            >
                              <Wallet className="h-4 w-4" />
                              <span>Connect Wallet</span>
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type="button"
                              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={openChainModal}
                              style={{ display: 'flex', alignItems: 'center' }}
                              type="button"
                              className="btn-secondary"
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 16,
                                    height: 16,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 8,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 16, height: 16 }}
                                    />
                                  )}
                                </div>
                              )}
                              <span className="text-slate-200">
                                {chain.name}
                              </span>
                            </button>

                            <button
                              onClick={openAccountModal}
                              type="button"
                              className="btn-secondary"
                            >
                              <span className="text-slate-200">
                                {account.displayName}
                              </span>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/dashboard"
                className="block text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="block text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="pt-4 border-t border-slate-700/50">
                <ConnectButton />
              </div>

              {isConnected && balance && (
                <div className="flex items-center justify-between glass-dark px-3 py-2 rounded-lg">
                  <span className="text-sm text-slate-400">Balance:</span>
                  <span className="text-sm font-medium text-slate-200">
                    {formatBalance(balance.formatted)} {balance.symbol}
                  </span>
                </div>
              )}

              {isConnected && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Network:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getNetworkColor(chainId)}`}
                    />
                    <span className="text-sm text-slate-200">
                      {getNetworkName(chainId)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
