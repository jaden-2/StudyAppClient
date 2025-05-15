'use client'
import { React, useEffect, useRef, useState } from 'react';
import styles from "./homeLayout.module.css";
import GroupIcon from 'app/components/group/groupIcon';
import Group from './group';
import Image from 'next/image';
import CreateGroup from './createGroup';
import { useRouter } from 'next/navigation';
import Profile from '../profile/profile';
import FancyDisplay from '../test/FancyDisplay';
import ActionBar from '../Action/actionBar';
import JoinGroup from './joinGroup';
import Loader from '../common/Loader';
import LoginRequest from '../auth/LoginRequest';

const Layout = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentUser, setCurrentUser] = useState (null)
  const [groups, setGroups] = useState([]);
  const [isNewGroupDialog, setIsNewGroupDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [showProfile, setShowProfile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginRequest, setShowLoginRequest] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const router = useRouter();
  
  //server 
    const baseUrl = "http://localhost:9000/"
    const groupUrl = "api/studyApp/account/group"
    const userUrl = "api/studyApp/account"

  //
 
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if(!isLoggedIn) return;
    const token = localStorage.getItem("jwtToken")
  
    const fetchUser = async ()=>{
      try{
        const response = await fetch( "http://localhost:9000/api/studyApp/account", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if(response.status == 200){
          const data = await response.json()
          console.log(data)
          setCurrentUser(data)
        }
      }catch (e){
        console.error(e)
      }
    }
    fetchUser()

  }, [router, isLoggedIn]);

  useEffect(()=>{
      if(!isLoggedIn) return

      const token = localStorage.getItem("jwtToken")
      

      const fetchGroups = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:9000/api/studyApp/account/group", {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          if (response.status === 200) {
            const data = await response.json();
            
            setGroups(data);
          } else if (response.status === 401) {
            router.push("/login");
          }
        } catch (error) {
          console.error('Failed to fetch groups:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchGroups();
    
  }, [updateToggle, router, isLoggedIn])

  useEffect(() => {
    // Allow layout calculations to complete
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check for JWT token and set login status
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    if (window.innerWidth <= 768) {
        setSidebarVisible(false);
    }
  };

  const checkAuth = () => {
    if (!isLoggedIn) {
        setShowLoginRequest(true);
        return false;
    }
    return true;
  };

  const handleCreateGroup = async (groupData) => {
    if (!checkAuth()) return;
    const token = localStorage.getItem("jwtToken");

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:9000/api/studyApp/group", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groupData)
      });

      if (response.status === 201) {
        const newGroup = await response.json();
        console.log("Group create");
        setIsNewGroupDialog(false);
        setShowMenu(false)
        setUpdateToggle((prev)=>!prev)
      }
    } catch (error) {
      console.error('Failed to create group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async (id)=>{
    if (!checkAuth()) return;
    const token = localStorage.getItem("jwtToken")

    setIsLoading(true);
    try{
      console.log(`${baseUrl}${groupUrl}?group=${id}`)
      let response = await fetch(`${baseUrl}${groupUrl}?group=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "PUT"
      })

      if(response.status == 202){
        const sess = await response.json()
        setUpdateToggle((prev)=>!prev)
        setShowJoinDialog(false)
        setShowMenu(false)
      }else{
        alert(`Could not join group ${id}`)
      }
    }catch(e){
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  }

  const handleProfileClick = () => {
    if (!checkAuth()) return;
    setShowProfile(true);
  };

  const handleLogin = () => {
    router.push('/login');
    setShowLoginRequest(false);
  };

  const handleLoginCancel = () => {
    setShowLoginRequest(false);
    setIsLoggedIn(false);
  };

  return (
    <div className={`${styles.wrapper} ${isDarkMode ? 'dark-theme' : ''} ${isPageLoaded ? styles.pageLoaded : ''}`}>
      <header className={styles.header}>
        <div className={styles.actionBar}>
        <button 
            className={styles.iconButton} 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
        >
            <Image src="/image/home.svg" width={24} height={24} alt="Menu" />
        </button>

        <div className={styles.menuSection}>
          <button 
            className={styles.iconButton} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Image src="/image/menu.svg" width={20} height={20} alt="" />
          </button>
          
          {showMenu && (
            <div className={styles.actionBarContainer}>
              <ActionBar 
                onCreateGroup={() => setIsNewGroupDialog(true)}
                onJoinGroup={() => setShowJoinDialog(true)}
              />
            </div>
          )}
        </div>
      </div>

        <h2>Study App</h2>
        <div className={styles.headerActions}>
          <button 
            className={styles.iconButton} 
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Image 
              src={isDarkMode ? "/image/light_mode.svg" : "/image/dark_mode.svg"} 
              width={24} 
              height={24} 
              alt="Toggle theme" 
            />
          </button>
          <button className={styles.iconButton} onClick = {handleProfileClick} >
            <Image src="/image/profile_green.svg" width={24} height={24} alt="Profile" />
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <aside className={`${styles.sidebar} ${isSidebarVisible ? styles.visible : ''}`}>
          <h2>Study Groups</h2>
          <div className={styles.groupList}>
            {isLoading ? (
              <Loader />
            ) : (
              groups.map((group) => (
                <div 
                  key={group.groupId}
                  className={styles.groupItem}
                  onClick={() => handleGroupSelect(group)}
                >
                  <GroupIcon group={group} />
                </div>
              ))
            )}
          </div>
          
        </aside>
        {showProfile && (
            <FancyDisplay>
                <Profile 
                    user={currentUser}
                    onClose={() => setShowProfile(false)}
                />
            </FancyDisplay>
        )}
        {showJoinDialog && (
            <FancyDisplay>
                <JoinGroup
                    onClose={() => setShowJoinDialog(false)}
                    onJoin={handleJoinGroup}
                />
            </FancyDisplay>
        )}
        <main className={styles.mainContent}>
          {selectedGroup ? (
            <Group 
              groupData={{
                group: selectedGroup,
                goHome: () => setSelectedGroup(null),
                refresh: ()=>setUpdateToggle((prev)=>!prev)
              }}
            />
          ) : (
            <div className={styles.welcome}>
              <h1>Welcome to StudyApp</h1>
              <p>Select a group to start collaborating</p>
            </div>
          )}
        </main>
      </div>

      {isNewGroupDialog && (
        <FancyDisplay>
          <CreateGroup 
          onClose={() => setIsNewGroupDialog(false)}
          onCreate={handleCreateGroup}
        />
        </FancyDisplay>
      )}
      {showLoginRequest && (
        <FancyDisplay>
            <LoginRequest 
                onClose={handleLoginCancel}
                onLogin={handleLogin}
            />
        </FancyDisplay>
      )}
    </div>
  );
};

export default Layout;