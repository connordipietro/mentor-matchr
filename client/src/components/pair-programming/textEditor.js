import { PropTypes } from 'prop-types';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
// Themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
// Languages
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-coffee';
import 'ace-builds/src-noconflict/mode-css';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import useTextEditor from '../../utilities/useTextEditor';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const defaultThemes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'terminal',
];

const defaultLanguages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'coffee',
  'css',
];

export default function TextEditor({ userData }) {
  const { matchId, senderEmail } = userData;

  const {
    editorText,
    sendText,
    editorTheme,
    sendTheme,
    editorLanguage,
    sendLanguage,
  } = useTextEditor(matchId, senderEmail);

  const classes = useStyles();

  const handleThemeChange = (evt) => {
    sendTheme(evt.target.value);
  };

  const handleLanguageChange = (evt) => {
    sendLanguage(evt.target.value);
  };

  async function onChange(newValue) {
    sendText(newValue);
  }

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-helper-label">Theme</InputLabel>
        <Select
          labelId="select-helper-label"
          id="select-helper"
          value={editorTheme}
          onChange={handleThemeChange}
        >
          {defaultThemes.map((themeName) => (
            <MenuItem key={themeName} value={themeName}>
              {themeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-helper-label">Lanuage</InputLabel>
        <Select
          labelId="select-helper-label"
          id="select-helper"
          value={editorLanguage}
          onChange={handleLanguageChange}
        >
          {defaultLanguages.map((languageName) => (
            <MenuItem key={languageName} value={languageName}>
              {languageName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AceEditor
        mode={editorLanguage}
        theme={editorTheme}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        value={editorText.body}
        editorProps={{ $blockScrolling: true }}
      />
    </>
  );
}

TextEditor.propTypes = {
  userData: PropTypes.object,
};
