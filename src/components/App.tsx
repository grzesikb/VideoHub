import React, { useEffect, useState } from 'react';
import {
  Box,
  createTheme,
  ThemeProvider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { addDoc, getDocs } from '@firebase/firestore';
import { dbVideo } from '../firebaseInit';
import Fuse from 'fuse.js';

import VideoCard from './VideoCard';
import Navbar from './Navbar';
import Player from './Player';

export interface IVideo {
  link: string;
  name: string;
  img?: string;
}

interface ISearch {
  result: IVideo[] | null;
  value: string;
  isOn: boolean;
}

const App = () => {
  const Theme = createTheme({
    palette: {
      primary: {
        main: '#ef8f01',
      },
      mode: 'dark',
    },
  });

  // IMPORT
  const [open, setOpen] = useState<{ import: boolean; player: boolean }>({
    import: false,
    player: false,
  });

  const handleClose = () => setOpen({ import: false, player: false });

  const [importData, setImportData] = useState<IVideo>({
    link: '',
    name: '',
    img: '',
  });

  const handleImport = async () => {
    if (
      importData.name !== '' &&
      importData.link !== '' &&
      importData.link.startsWith('http')
    ) {
      await addDoc(dbVideo, {
        link: importData.link,
        name: importData.name,
        img: importData.img,
      });
      handleClose();
      setImportData({
        link: '',
        name: '',
        img: '',
      });
    }
  };

  // DATA

  const [data, setData] = useState<IVideo[]>([]);

  useEffect(() => {
    getDocs(dbVideo).then(async (snapshot) => {
      const allVideos = snapshot.docs.map((doc) => doc.data() as IVideo);
      let items: any[] = [];
      allVideos.forEach((item) => {
        items.push({
          ...item,
          link: item.link,
          name: item.name,
          img: item.img,
        });
      });

      if (items) setData(items);
    });
  }, [importData]);

  // PLAYER

  const [current, setCurrent] = useState<string>('');
  const handlePlay = (link: string) => {
    if (link.endsWith('.mp4')) {
      setCurrent(link);
      setOpen({
        import: false,
        player: true,
      });
    } else if (link.startsWith('http')) {
      window.open(link, '_blank');
    }
  };

  // SEARCH

  const [search, setSearch] = useState<ISearch>({
    result: null,
    value: '',
    isOn: false,
  });

  const serachVideos = (allVideos: IVideo[], value: string): IVideo[] => {
    if (value === '') return allVideos;
    else {
      const fuseOptions = {
        keys: ['name'], // Wyszukiwanie będzie przeprowadzane po polu 'name'
        includeScore: true, // Włącz wyniki oceny podobieństwa
        threshold: 0.4, // Wartość progowa oceny podobieństwa
        ignoreLocation: true, // Ignoruj położenie dopasowania
      };
      const fuse = new Fuse(allVideos, fuseOptions);
      const results = fuse.search(value);
      const searchResult = results
        .filter(
          (result) =>
            result.score !== undefined && result.score < fuseOptions.threshold,
        )
        .map((result) => result.item);
      return searchResult;
    }
  };

  useEffect(() => {
    if (search.value === '') setSearch({ ...search, isOn: false });
    else {
      const searchResult = serachVideos(data, search.value);
      setSearch({ ...search, result: searchResult, isOn: true });
    }
  }, [search.value]);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          background: '#000',
        }}
      >
        <Navbar
          import={() =>
            setOpen({
              import: true,
              player: false,
            })
          }
          searchOnChange={(e: any) => {
            setSearch((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
          serachValue={search.value}
        />
        <div>
          <Dialog
            open={open.import}
            onClose={handleClose}
            PaperProps={{
              variant: 'outlined',
              style: {
                borderRadius: 18,
                background: '#000',
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: 700 }}>Import Video</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                required
                id="nameOfVideo"
                label="Name"
                fullWidth
                variant="outlined"
                value={importData.name}
                onChange={(e) => {
                  setImportData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
              <TextField
                margin="dense"
                required
                id="linkVideo"
                label="Link to Video"
                fullWidth
                variant="outlined"
                value={importData.link}
                onChange={(e) => {
                  setImportData((prev) => ({
                    ...prev,
                    link: e.target.value,
                  }));
                }}
              />
              <TextField
                margin="dense"
                id="linkImg"
                label="Link To Image"
                fullWidth
                variant="outlined"
                value={importData.img}
                onChange={(e) => {
                  setImportData((prev) => ({
                    ...prev,
                    img: e.target.value,
                  }));
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleImport}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Box
          component="ul"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
            p: '10%',
            m: 0,
            pt: 3,
            mt: 15,
          }}
        >
          {search.isOn
            ? search.result
              ? search.result.map((item) => (
                  <VideoCard
                    onClick={() => handlePlay(item.link)}
                    name={item.name}
                    img={item.img}
                  />
                ))
              : 'No videos found'
            : data.map((item) => (
                <VideoCard
                  key={item.link}
                  onClick={() => handlePlay(item.link)}
                  name={item.name}
                  img={item.img}
                />
              ))}

          <Dialog
            open={open.player}
            onClose={handleClose}
            PaperProps={{
              variant: 'outlined',
              style: {
                borderRadius: 18,
                background: '#000',
              },
            }}
          >
            <Player link={current} name="" />
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
