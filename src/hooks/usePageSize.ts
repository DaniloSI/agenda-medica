import {
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function usePage(quantityItems: number) {
  const theme = useTheme();

  const isDownXS = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownSM = useMediaQuery(theme.breakpoints.down('md'));

  let numberItemsPage: number;
  let totalPages: number;

  if (isDownXS) {
    numberItemsPage = 3;
  } else if (isDownSM) {
    numberItemsPage = 4;
  } else {
    numberItemsPage = 5;
  }

  totalPages = Math.trunc(quantityItems / numberItemsPage);

  if (quantityItems % numberItemsPage) {
    totalPages += 1;
  }

  return { numberItemsPage, totalPages };
}
