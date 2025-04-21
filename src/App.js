// src/App.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Drawer,
  Box,
  Toolbar,
  AppBar,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  styled,
  Badge,
  Button,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStore } from './store/store';
import Dashboard from './components/Dashboard';
import AddWidgetForm from './components/AddWidgetModal';

// Styled Components
const TopBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: '8px 32px',
  borderBottom: '1px solid #e0e0e0',
});

const SearchWrapper = styled(Box)({
  position: 'relative',
  backgroundColor: '#f0f4ff',
  borderRadius: '8px',
  marginLeft: '32px',
  width: '360px',
});

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: '#5a607f',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 20px 10px 40px',
    fontSize: '16px',
  },
}));

const IconsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

const BottomBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f0f4ff', // Updated background color
  padding: '12px 32px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
});

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const NavButton = styled(Button)({
  textTransform: 'none',
  color: '#5a607f',
  borderColor: '#d8dae5',
  borderRadius: '6px',
  padding: '6px 12px',
  '&:hover': {
    borderColor: '#c1c4d6',
  },
});

const AppBarContainer = styled(AppBar)({
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: 'none',
  position: 'static',
});

const MainContent = styled(Box)({
  padding: '24px 32px',
  backgroundColor: '#f0f4ff', // Updated background color
  minHeight: 'calc(100vh - 112px)', // Adjust based on your header heights
});

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addWidget = useStore((state) => state.addWidget);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleConfirm = (selectedWidgets, category) => {
    const categoryMap = {
      CSPM: 1,
      CWPP: 2,
      Image: 3,
      Ticket: 4,
    };

    const categoryId = categoryMap[category];
    
    if (categoryId) {
      selectedWidgets.forEach((widget) => {
        addWidget(categoryId, widget);
      });
    }
    closeDrawer();
  };

  return (
    <Container maxWidth={false} disableGutters>
      <AppBarContainer>
        {/* Top Navigation Bar */}
        <TopBar>
          <Typography variant="body1" color="#5a607f" fontWeight={500}>
            HOME > Dashboard V2
          </Typography>

          <SearchWrapper>
            <SearchIcon sx={{ position: 'absolute', left: '12px', top: '10px', color: '#5a607f' }} />
            <SearchInput placeholder="Search something..." />
          </SearchWrapper>

          <IconsWrapper>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon sx={{ color: '#5a607f' }} />
              </Badge>
            </IconButton>
            <IconButton>
              <SettingsIcon sx={{ color: '#5a607f' }} />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }} src="/static/images/avatar/1.jpg" />
          </IconsWrapper>
        </TopBar>

        {/* Bottom Navigation Bar */}
        <BottomBar>
          <Typography variant="h6" fontWeight={600} color="#333">
            CNAPP Dashboard
          </Typography>

          <RightSection>
            <NavButton variant="outlined" startIcon={<AddIcon />} onClick={openDrawer}>
              Add Widget
            </NavButton>
            <IconButton>
              <RefreshIcon sx={{ color: '#5a607f' }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ color: '#5a607f' }} />
            </IconButton>
            <Select
              value="Last 2 days"
              onChange={(e) => console.log(e.target.value)}
              sx={{
                width: '140px',
                '& .MuiSelect-select': {
                  py: '8px',
                  fontSize: '16px',
                  color: '#5a607f',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d8dae5',
                },
              }}
            >
              <MenuItem value="Last 2 days">Last 2 days</MenuItem>
              <MenuItem value="Last 7 days">Last 7 days</MenuItem>
              <MenuItem value="Last 30 days">Last 30 days</MenuItem>
            </Select>
          </RightSection>
        </BottomBar>
      </AppBarContainer>

      {/* Main Content */}
      <MainContent>
        <Dashboard openModal={openDrawer} />
      </MainContent>

      {/* Add Widget Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 600,
            p: 3,
          },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Personalize your dashboard by adding the following widget
          </Typography>
          <AddWidgetForm onConfirm={handleConfirm} onCancel={closeDrawer} />
        </Box>
      </Drawer>
    </Container>
  );
};

export default App;