import { mockAuditLogs } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import { hr } from 'date-fns/locale';

export default function AdminAuditPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-heading mb-8">Audit Log</h1>

      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum/vrijeme</TableHead>
              <TableHead>Akcija</TableHead>
              <TableHead>Korisnik</TableHead>
              <TableHead>Detalji</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm text-muted-foreground">
                  {format(parseISO(log.timestamp), 'd. MMM yyyy HH:mm', { locale: hr })}
                </TableCell>
                <TableCell>
                  <span className="font-medium text-foreground">{log.action}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{log.userEmail}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {log.details || '-'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {mockAuditLogs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nema aktivnosti za prikaz.
          </div>
        )}
      </div>
    </div>
  );
}
